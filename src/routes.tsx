import { Route, Routes } from "react-router";
import LoginPage from "./templates/Login-users";
import ManageRecipe from "./templates/Manage-recipe/list";
import ManageBlogs from "./templates/Manage-blogs/list";
import ManagePermission from "./templates/Manage-permissions";
import ManageRoles from "./templates/Manage-roles/list";
import ManageAdmins from "./templates/Manage-admin/list";
import RecipeForm from "./templates/Manage-recipe/form";
import BlogsForm from "./templates/Manage-blogs/form";
import RoleForm from "./templates/Manage-roles/form";
import AdminForm from "./templates/Manage-admin/form";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/manage-recipes" element={<ManageRecipe />} />
      <Route path="/manage-recipes/add-recipe" element={<RecipeForm />} />
      <Route path="/manage-recipes/edit-recipe/:id" element={<RecipeForm />} />

      <Route path="/manage-blogs" element={<ManageBlogs />} />
      <Route path="/manage-blogs/add-blog" element={<BlogsForm />} />
      <Route path="/manage-blogs/edit-blog/:id" element={<BlogsForm />} />

      <Route path="/manage-permissions" element={<ManagePermission />} />

      <Route path="/manage-roles" element={<ManageRoles />} />
      <Route path="/manage-roles/edit-role/:id" element={<RoleForm />} />
      <Route path="/manage-roles/add-role" element={<RoleForm />} />

      <Route path="/manage-admin" element={<ManageAdmins />} />
      <Route path="/manage-admin/edit-admin/:id" element={<AdminForm />} />
    </Routes>
  );
}

export default Pages;
