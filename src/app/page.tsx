import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect to StudyHall onboarding
  redirect("/studyhall/onboarding")
}
