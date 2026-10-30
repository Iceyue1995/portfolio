import { redirect } from "next/navigation";

// No separate entry page: project navigation lives inside the presentation.
export default function InterviewRedirect() {
  redirect("/seedflow-presentation");
}
