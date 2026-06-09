import { redirect } from "next/navigation";

// Redirect /blogdetail to /blog since a specific post ID is needed
export default function BlogDetailRedirect() {
  redirect("/blog");
}
