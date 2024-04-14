import React from 'react';
import './App.css';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa'; 

type ProjectCard = {
  title: string;
  date: string;
  description: string;
  tools: string;
};

const ProjectCard: React.FC<ProjectCard> = ({ title, date, description, tools }) => (
  <div className="bg-white p-4 shadow-lg rounded-md">
    <h3 className="text-lg font-bold">{title}</h3>
    <h4>{date}</h4>
    <p>{description}</p>
    <p>{tools}</p>
  </div>
);

type HobbyCard = {
  title: string;
  description: string;
  imageUrl: string;
};

const HobbyCard: React.FC<HobbyCard> = ({ title, description, imageUrl }) => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <img src={imageUrl} alt={title} className="h-60 w-full object-cover rounded-lg"/>
    <h3 className="text-lg font-bold mt-2">{title}</h3>
    <p>{description}</p>
  </div>
);

function App() {
  const projects = [
    { title: "Dilo en Señas", date: "[ Aug 2023 – Current ]", description: "Frontend Design on iOS App, Program the frontend of the iOS application, Integrate an AI image classification model, Connect the application with the backend", tools: "SwiftUI, Create-ML" },
    { title: "1st place FemCoding Challenge", date: "[ 14 Nov 2023 ]", description: "PediScan: an application focused on supporting older adults suffering from diabetes and diabetic foot. This application offers different tools, such as questionnaires and graphs, which the user can use to keep a daily record of how they feel, how their habits are going, and symptom improvements. In addition, it has an image classifier AI model that detects the level of diabetic foot and provides you with personalized tips on how to treat it.With this application we obtained first place in the category of “Educational needs, health and well-being”.", tools: "SwiftUI, Create-ML" },
    { title: "1st place MACC Challenge", date: "[ 28 Nov 2023 ]", description: "StitchMentor: An app from VisionPro that uses augmented reality along with AI to help medical students learn and practice suturing. It has various functionalities such as a video gallery to learn suturing and personalized guided practices for a specific suture. The student receives live feedback on the suture they made. With this application we obtained first place in one of the groups.", tools: "VisionOS" },
    { title: "Melodine - App for Swift Student Challenge 2024", date: "[ Jan 2024 – Feb 2024 ]", description: "An application that seeks to teach the basic concepts of music theory in an innovative and fun way. Using various techniques such as visual recognition with colors and ear training based on various melodies.", tools: "SwiftUI, AVFoundation, EffectsLibrary" }
  ];

  const hobbies = [
    { title: "Piano", description: "I did an introductory musical career in piano. I have been playing for 11 years.", imageUrl: "/Piano.jpg" },
    { title: "Violin", description: "In high school I took violin lessons. I currently participate in the university's symphony orchestra.", imageUrl: "/Violin.jpg" }
  ];

  return (
    <div className="container mx-auto px-4">
      <header className="text-center my-6">
        <img src="/Foto.jpg" alt="Your Name" className="w-44 h-32 rounded-full mx-auto"/>
        <h1 className="text-4xl font-bold mt-2">Carolina Nicole González Leal</h1>
        <p>Software developer</p>
      </header>

      <section className="my-8">
        <h2 className="text-2xl font-bold text-center">Proyects</h2>
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold text-center">Education</h2>
        <ul className="list-disc pl-5">
          <li>Bachelor of Science in Computer Science and Technology Engineering - Instituto tecnológico y de estudios superiores de Monterrey [ 2021 – Current ]</li>
          <li>High School - Prepa Tec Eugenio Garza Lagüera [ 2018 – 2021 ]</li>
          <li>Mastering Data Structures and Algorithms using C and C++ - Udemy [ Mar 2022 – Jun 2022 ]</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold text-center">Digital Skills</h2>
        <p>iOS Development: Swift, Objective-C / Object oriented Programming / Web Technologies Fundamentals - HTML, CSS / Version Control System (Git) / Knowledge of SQL. / Languages : C++,C, Java, Python, JavaScript, C. / Node.Js, React.Js</p>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold text-center">Hobbies</h2>
        <div className="grid grid-cols-2 gap-4">
          {hobbies.map((hobby, index) => (
            <HobbyCard key={index} {...hobby} />
          ))}
        </div>
      </section>

      <footer className="text-center my-8">
        <p>Feel free to contact me:</p>
        <div className="flex justify-center space-x-4">
          <a href="https://www.linkedin.com/in/carolina-nicole-gonzalez-leal-4b961524b/" className="text-blue-600"><FaLinkedin size={24}/></a>
          <a href="https://github.com/CaroGzzLeal" className="text-gray-800"><FaGithub size={24}/></a>
          <a href="https://www.instagram.com/caroleal03/" className="text-pink-600"><FaInstagram size={24}/></a>
          <a href="https://wa.me/528117640863" className="flex items-center space-x-2 text-green-500"><FaWhatsapp size={24} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
