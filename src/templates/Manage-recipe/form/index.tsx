import Layout from "../../../layout/layout";
import Upload from "../../../components/ImageUpload";
import { Formik } from "formik";
import { Form, SubmitButton } from "formik-antd";
import {
  RecipeTypes,
  SimilarType,
  TimeOptions,
  initialValues,
  validationSchema,
} from "./constant";
import { StyledContainer, StyledOptions } from "./Styled";
import {
  Col,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Spin,
  message,
} from "antd";
import InputText from "../../../components/InputText/input";
import TagsHolder from "../../../components/Tags";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_RECIPE, GET_RECIPE, GET_SIMILAR_OPTION } from "./gql";
import InputHolder from "../../../components/InputHolder";
import RichTextEditor from "../../../components/Richtext";

function RecipeForm() {
  const [initial, setInitial] = useState<RecipeTypes>(initialValues);
  const [selection, setSelection] = useState([]);
  const [reinitialize, setReinitialize] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [create, { error }] = useMutation(CREATE_RECIPE);

  const { data, loading } = useQuery(GET_RECIPE, {
    skip: !id,
    variables: {
      id: id,
    },
    fetchPolicy: "no-cache",
  });

  const { data: similar } = useQuery(GET_SIMILAR_OPTION, {
    variables: {
      id: id || "",
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data && data.recipe) {
      const { recipe } = data;

      setInitial({
        id,
        ...recipe,
        similar: recipe.similar.map(({ name }: any) => name),
      });
      setReinitialize(true);
    }
  }, [data]);

  useEffect(() => {
    if (!reinitialize) {
      setReinitialize(false);
    }
  }, [reinitialize]);

  useEffect(() => {
    if (similar && similar.Similar) {
      setSelection(similar.Similar.map(({ name }: SimilarType) => name));
    }
  }, [similar]);

  const breadcrumbs = [
    {
      title: "Manage Recipes",
      href: "/manage-recipes",
    },
    {
      title: id ? "Edit" : "Add",
    },
  ];

  const handleSubmit = async (recipe: RecipeTypes) => {
    await create({
      variables: {
        recipe,
      },
    });

    message.success({
      content: `Recipe ${id ? "Updated" : "Created"} Successfully`,
      duration: 3,
    });

    navigate("/manage-recipes");
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
    <Layout breadcrumbs={breadcrumbs} loading={loading}>
      <StyledContainer>
        <Spin spinning={loading}>
          <Formik
            validationSchema={validationSchema}
            enableReinitialize={reinitialize}
            initialValues={initial}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, dirty, isValid }) => {
              return (
                <Form>
                  <Row gutter={10} style={{ marginBottom: "10px" }}>
                    <Col span={16}>
                      <Upload
                        value={values.image.landscape}
                        onchange={(value) =>
                          setFieldValue("image.landscape", value)
                        }
                      />
                    </Col>
                    <Col span={8}>
                      <Upload
                        value={values.image.square}
                        onchange={(value) =>
                          setFieldValue("image.square", value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row gutter={10} style={{ marginBottom: "10px" }}>
                    <InputText
                      name="title"
                      placeholder="title"
                      label="Title"
                      span={12}
                    />
                    <InputText
                      name="name"
                      placeholder="name"
                      label="Name"
                      span={6}
                    />
                    <InputText
                      name="category"
                      placeholder="category"
                      label="Category"
                      span={6}
                    />
                  </Row>
                  <Row style={{ marginBottom: "20px" }}>
                    <Col span={24}>
                      <RichTextEditor
                        label="Description"
                        values={values.description}
                        onchange={(value) =>
                          setFieldValue("description", value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row gutter={10} style={{ marginBottom: "10px" }}>
                    <Col span={4}>
                      <StyledOptions>
                        <p>Featured:</p>
                        <Radio.Group
                          value={values.is_featured}
                          defaultValue={false}
                          onChange={(e: RadioChangeEvent) =>
                            setFieldValue("is_featured", e.target.value)
                          }
                          className="options"
                        >
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>Nope</Radio>
                        </Radio.Group>
                      </StyledOptions>
                    </Col>
                    <Col span={4}>
                      <StyledOptions>
                        <p>Popular:</p>
                        <Radio.Group
                          value={values.is_popular}
                          defaultValue={false}
                          onChange={(e: RadioChangeEvent) =>
                            setFieldValue("is_popular", e.target.value)
                          }
                          className="options"
                        >
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>Nope</Radio>
                        </Radio.Group>
                      </StyledOptions>
                    </Col>
                    <Col span={5}>
                      <StyledOptions>
                        <p>Cooking time:</p>
                        <Row gutter={5}>
                          <Col span={12}>
                            <InputNumber
                              defaultValue={30}
                              value={values.cooking_time.count}
                              min={1}
                              max={60}
                              width={50}
                              onChange={(value) =>
                                setFieldValue("cooking_time.count", value)
                              }
                            />
                          </Col>
                          <Col span={12}>
                            <Select
                              defaultValue="minutes"
                              onChange={(value) =>
                                setFieldValue("cooking_time.type", value)
                              }
                              value={values.cooking_time.type}
                              options={TimeOptions}
                            />
                          </Col>
                        </Row>
                      </StyledOptions>
                    </Col>
                    <Col span={11}>
                      <TagsHolder
                        values={values.similar}
                        onchange={(values) => setFieldValue("similar", values)}
                        placeholder="input similar here"
                        type="select"
                        options={selection}
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={8}>
                      <Row>
                        <Col span={24} style={{ marginBottom: "10px" }}>
                          <TagsHolder
                            values={values.tags}
                            onchange={(values) => setFieldValue("tags", values)}
                            placeholder="input tags here"
                            type="input"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <InputHolder
                            onchange={(values) =>
                              setFieldValue("ingredients", values)
                            }
                            values={values.ingredients}
                            label="Ingredient"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={16}>
                      <InputHolder
                        onchange={(values) =>
                          setFieldValue("instruction", values)
                        }
                        values={values.instruction}
                        label="Instruction"
                      />
                    </Col>
                  </Row>
                  <br />
                  <SubmitButton disabled={!isValid || !dirty}>
                    save
                  </SubmitButton>
                </Form>
              );
            }}
          </Formik>
        </Spin>
      </StyledContainer>
    </Layout>
  );
}

export default RecipeForm;
