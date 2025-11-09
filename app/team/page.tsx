import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const members = [
  {
    name: "Nabila Dwi Putri Zaskia",
    role: "Project Manager & Penulis Proposal",
    avatar: "/image/nabila.jpg",
    link: "#",
  },
  {
    name: "Muhammad Vigar Septianta Pratama",
    role: "UI/UX Designer",
    avatar: "/image/vigar.jpg",
    link: "#",
  },
  {
    name: "Ahmad Isnainil Fadhili",
    role: "Frontend & Backend Developer",
    avatar: "/image/fadhil.jpg",
    link: "#",
  },
  {
    name: "M. Kevin Bayu Maulidi",
    role: "Content Researcher",
    avatar: "/image/kevin.jpg",
    link: "#",
  },
  {
    name: "M. Andika Aulia Haq",
    role: "Multimedia Designer",
    avatar: "/image/andika.jpg",
    link: "#",
  },
];

export default function TeamSection() {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-32 dark:bg-transparent">
        <div className="mx-auto max-w-6xl border-t px-6">
          <span className="text-caption -ml-6 -mt-3.5 block w-max bg-background px-6">
            Team
          </span>
          <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
            <div className="sm:w-2/5">
              <h2 className="text-3xl font-semibold text-primary font-serif sm:text-4xl">
                Our Team
              </h2>
            </div>
            <div className="mt-6 sm:mt-0">
              <p>
                Dalam proses pengembangan, kami selalu berkolaborasi dengan
                komunitas dan pelaku budaya untuk memastikan setiap konten
                kuliner yang ditampilkan tetap autentik dan merepresentasikan
                cita rasa Indonesia dengan akurat.
              </p>
            </div>
          </div>
          <div className="mt-12 md:mt-24">
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="group overflow-hidden cursor-pointer"
                >
                  <Image
                    className="h-96 w-full rounded-md lg:grayscale object-cover object-top transition-all duration-500 group-hover:grayscale-0 lg:group-hover:h-[22.5rem] group-hover:rounded-xl"
                    src={member.avatar}
                    alt="team member"
                    width="826"
                    height="1239"
                  />
                  <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                    <div className="flex justify-between">
                      <h3 className="text-base tracking-wider lg:tracking-normal font-medium transition-all duration-500 group-hover:tracking-wider">
                        {member.name}
                      </h3>
                      <span className="text-xs">_0{index + 1}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-muted-foreground inline-block lg:translate-y-6 text-sm lg:opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
