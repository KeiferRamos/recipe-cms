import { useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import {
  BlogType,
  ValidationSchema,
  breadCrumbs,
  initialValue,
} from "./constant";
import { Formik } from "formik";
import { Form, SubmitButton } from "formik-antd";
import { Button, Col, Row, Skeleton, message } from "antd";
import Upload from "../../../components/ImageUpload";
import InputText from "../../../components/InputText/input";
import { ContentContainer, StyledModal } from "./styled";
import RichTextEditor from "../../../components/Richtext";
import { CloseOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BLOG, GET_BLOG } from "./gql";
import { useNavigate, useParams } from "react-router";

function BlogsForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [reinitialize, setReinitialize] = useState(false);
  const [blog, setBlog] = useState(initialValue);

  const [create, { error }] = useMutation(CREATE_BLOG);

  const { data } = useQuery(GET_BLOG, {
    skip: !id,
    variables: {
      id,
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!reinitialize) {
      setReinitialize(false);
    }
  }, [reinitialize]);

  useEffect(() => {
    if (data && data.blog) {
      setBlog(data.blog);
      setReinitialize(true);
    }
  }, [data]);

  const handleSubmit = async (blog: BlogType) => {
    const content = blog.content.map((content, i) => {
      return { ...content, order: i };
    });
    await create({
      variables: {
        blog: {
          ...blog,
          content,
        },
      },
    });

    message.success({
      content: `You have successfully ${id ? "Updated" : "Created"} a Blog.`,
      duration: 3,
    });
    navigate("/manage-blogs");
  };

  useEffect(() => {
    if (error) {
      const errors: any = error.graphQLErrors[0].extensions.originalError;

      message.error({
        content: errors.message[0],
        duration: 3,
        style: {
          textTransform: "capitalize",
        },
      });
    }
  }, [error]);

  return (
    <Layout breadcrumbs={breadCrumbs} loading={false}>
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={ValidationSchema}
        enableReinitialize={reinitialize}
        initialValues={blog}
      >
        {({ values, isValid, dirty, setFieldValue }) => {
          const onSelect = (type: string) => {
            setFieldValue("content", [...values.content, { type, value: "" }]);
            setShowModal(false);
          };

          return (
            <Form>
              <Row>
                <Col span={24}>
                  <Upload
                    onchange={(value) => setFieldValue("banner_image", value)}
                    value={values.banner_image}
                  />
                </Col>
              </Row>
              <br />
              <Row gutter={20}>
                <InputText name="title" placeholder="title" label="Title" />
                <InputText name="author" placeholder="author" label="Author" />
              </Row>
              <Row>
                <Col span={24}>
                  <ContentContainer>
                    {values.content
                      .sort((a: any, b: any) => a.order - b.order)
                      .map(({ type, value: input }, i) => {
                        const handleChange = (value: string) => {
                          setFieldValue(`content[${i}].value`, value);
                        };
                        return (
                          <Row
                            style={{ marginBottom: 15 }}
                            className="content-input"
                          >
                            <CloseOutlined
                              className="remove-btn"
                              onClick={() =>
                                setFieldValue(
                                  "content",
                                  values.content.filter(
                                    (el, index) => index !== i
                                  )
                                )
                              }
                            />
                            <Col span={24}>
                              {type === "image" ? (
                                <Upload
                                  value={input}
                                  onchange={(value) => handleChange(value)}
                                />
                              ) : (
                                <RichTextEditor
                                  values={input}
                                  onchange={(value) => handleChange(value)}
                                />
                              )}
                            </Col>
                          </Row>
                        );
                      })}
                    <Button onClick={() => setShowModal(true)}>
                      Add Content
                    </Button>
                  </ContentContainer>
                </Col>
              </Row>
              <StyledModal
                footer={null}
                open={showModal}
                onCancel={() => setShowModal(false)}
              >
                <h2>Select Type of content</h2>
                <Row gutter={20}>
                  <Col span={12} onClick={() => onSelect("image")}>
                    <Skeleton.Image
                      style={{ height: 150 }}
                      active
                    ></Skeleton.Image>
                    <p>Image</p>
                  </Col>
                  <Col span={12} onClick={() => onSelect("text")}>
                    <Skeleton active style={{ height: 150 }} />
                    <p>Richtext</p>
                  </Col>
                </Row>
              </StyledModal>
              <br />
              <SubmitButton disabled={!dirty || !isValid}>Save</SubmitButton>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
}

export default BlogsForm;
