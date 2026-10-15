export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId?: string;
};

export const certificates: Certificate[] = [
  {
    title: "Back-End Web Development",
    issuer: "IBM",
    date: "Apr 2026",
    image: "/certificates/ibm-backend.png",
  },
  {
    title: "Front-End Web Development",
    issuer: "IBM",
    date: "Mar 2026",
    image: "/certificates/ibm-frontend.png",
  },
  {
    title: "Certificate of Completion in Frontend Development",
    issuer: "DevCareer Tech Program & Alt School Africa",
    date: "Apr 2024",
    image: "/certificates/altschool-frontend.png",
  },
  {
    title: "JavaScript Essentials, Level 1",
    issuer: "OpenEDG JavaScript Institute & Cisco Networking Academy",
    date: "Sept 2023",
    image: "/certificates/javascript-essentials.png",
  },
  {
    title: "C#.NET Core Certification",
    issuer: "Makintouch Consulting & Loopskill.com",
    date: "",
    image: "/certificates/csharp-dotnet-core.png",
    credentialId: "LS626942131",
  },
];
