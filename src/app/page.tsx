import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import Navbar from "@/components/Navbar";
import { getUserByEmail, insertUser } from "@/lib/supabase/userActions";
import { redirect } from 'next/navigation';
import SelectContainer from "@/components/SelectContainer";
import { getSubjects } from "@/lib/catalog";
import CoursesContainer from "@/components/CoursesContainer";
 
export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await getUserByEmail(session?.user?.email)

  if (!user && session) {
    await insertUser(session.user?.name, session.user?.email)
  }

  const subjects = await getSubjects()
  return (
    <div className="h-screen">
      <div className="px-20 flex flex-col items-center">
        <SelectContainer user={user} subjects={subjects}/>
        <CoursesContainer user={user} />
      </div>
    </div>
  );
}
