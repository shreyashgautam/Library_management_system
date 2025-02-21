import React from "react";
const ShoppingAbout = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-16 px-6">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Section Title */}
        <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-8 
        transition-all duration-300 hover:text-blue-500 hover:scale-105 hover:drop-shadow-lg">
          📚 Central Library
        </h2>

        {/* Intro Text */}
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-10 leading-relaxed opacity-90 
        transition-opacity hover:opacity-100">
          The Central Library at VIT Chennai is a **state-of-the-art facility** spread over four floors,
          equipped with modern amenities like air-conditioning, fire alarms, CCTV, and RFID technology
          for seamless access and security.
        </p>

        {/* Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Resources Card */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 transform transition-all 
          hover:scale-105 hover:shadow-2xl hover:border-l-8 hover:border-blue-500">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">📖 Resources</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Total Books:</strong> 64,074</li>
              <li><strong>Back Volumes:</strong> 2,439</li>
              <li><strong>Print Journals:</strong> 266 (National: 126, International: 140)</li>
              <li><strong>E-Journals:</strong> IEEE, Springer, JSTOR & more</li>
              <li><strong>E-Books:</strong> 17,393</li>
              <li><strong>Media Resources (CD/DVDs):</strong> 4,303</li>
              <li><strong>Magazines:</strong> 60</li>
            </ul>
          </div>

          {/* Services Card */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 transform transition-all 
          hover:scale-105 hover:shadow-2xl hover:border-l-8 hover:border-purple-500">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">🔧 Services</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Circulation & Reference Service</li>
              <li>Web OPAC (Online Public Access Catalogue)</li>
              <li>Inter Library Loan & Resource Sharing</li>
              <li>Multimedia Resource & Online Databases</li>
              <li>NPTEL e-Learning & User Education</li>
              <li>Tele/Video Conferencing</li>
            </ul>
          </div>
        </div>

        {/* Membership Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 transition-all 
        hover:scale-105 hover:shadow-2xl hover:border-l-8 hover:border-green-500">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">🎟️ Membership</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            All students, faculty, and staff of VIT Chennai are **library members**. The library also has
            institutional memberships with BCL Chennai, American Information Resources Center, DELNET,
            INFLIBNET, and MALIBNET.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShoppingAbout;
