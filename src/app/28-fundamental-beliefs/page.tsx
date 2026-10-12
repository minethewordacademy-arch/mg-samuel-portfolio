import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function SpiritualGrowthPage() {
  const classDetails = {
    teacher: "Tr. Sarah (Sabbath School)",
    target: "Beginner, Kindergarten & Primary",
    date: "July & August 2026",
    duration: "5-10 mins (Opening Activity/Ice Breaker)",
  };

  const beliefs = [
    { id: 1, title: "The Holy Scriptures", summary: "The Old and New Testaments are the inspired, infallible Word of God, the only rule of faith and practice." },
    { id: 2, title: "The Trinity", summary: "There is one God in three co-eternal Persons: God the Father, God the Son, and God the Holy Spirit." },
    { id: 3, title: "The Father", summary: "The eternal Father is the Creator, Sustainer, and Sovereign of all creation, loving us with an everlasting love." },
    { id: 4, title: "The Son", summary: "Jesus Christ is the eternal Son of God. He became man, died on the cross as a sacrifice for our sins, and rose again." },
    { id: 5, title: "The Holy Spirit", summary: "The Holy Spirit is the divine representative of Christ on earth, empowering, sanctifying, and guiding believers." },
    { id: 6, title: "Creation", summary: "God created the heavens and the earth in six literal days and rested on the seventh, establishing the Sabbath." },
    { id: 7, title: "Nature of Humanity", summary: "Humans were created in the image of God, but through sin, this image was marred and death entered the world." },
    { id: 8, title: "The Great Controversy", summary: "The cosmic conflict between Christ and Satan, which began in heaven and continues on earth until sin is eradicated." },
    { id: 9, title: "Life, Death, Resurrection", summary: "Christ lived a sinless life, died for our sins, and was resurrected, providing the only way of eternal salvation." },
    { id: 10, title: "Experience of Salvation", summary: "Salvation is a free gift of grace through faith in Jesus Christ, resulting in a new birth and total transformation." },
    { id: 11, title: "Growing in Christ", summary: "By the Holy Spirit, we grow in character, partake of the divine nature, and become more like Jesus in our daily lives." },
    { id: 12, title: "The Church", summary: "The church is the community of believers who confess Jesus as Lord, called to worship God and spread the gospel." },
    { id: 13, title: "Remnant and Mission", summary: "The remnant of the last days is called to proclaim the Three Angels' Messages and prepare the world for Christ's soon return." },
    { id: 14, title: "Unity in the Body", summary: "The church is one body with diverse gifts, united in Christ and serving one another in love and humility." },
    { id: 15, title: "Baptism", summary: "Immersion in water follows repentance, symbolizing dying to the old life of sin and rising to a new life in Christ." },
    { id: 16, title: "Lord's Supper", summary: "A memorial of Jesus' death and resurrection, where we partake of bread and unfermented grape juice in holy communion." },
    { id: 17, title: "Spiritual Gifts", summary: "The Holy Spirit distributes gifts (prophecy, teaching, healing, etc.) to build up the body of Christ and serve others." },
    { id: 18, title: "Gift of Prophecy", summary: "The Spirit of Prophecy was a gift manifested in Ellen G. White, who led the church back to the Bible and health reform." },
    { id: 19, title: "Law of God", summary: "God's Ten Commandments are the eternal, unchangeable standard of righteousness, reflecting His holy character." },
    { id: 20, title: "The Sabbath", summary: "The seventh-day Sabbath (Saturday) is God's holy rest day, a sign of our relationship with our Creator and Redeemer." },
    { id: 21, title: "Stewardship", summary: "We are stewards of God's resources—our time, talents, and health—and are called to faithfully manage them for His glory." },
    { id: 22, title: "Christian Behavior", summary: "We are called to live in temperance, abstaining from things harmful to the body (tobacco, alcohol, drugs) to honor our temple." },
    { id: 23, title: "Marriage and Family", summary: "Marriage is a sacred union between one man and one woman, reflecting the relationship between Christ and His church." },
    { id: 24, title: "Sanctuary Ministry", summary: "Jesus is our High Priest in the heavenly sanctuary, interceding for us, cleansing us from sin, and performing the final judgment." },
    { id: 25, title: "Second Coming", summary: "Jesus will return literally, visibly, and audibly in the clouds to take His faithful believers home to heaven." },
    { id: 26, title: "Death and Resurrection", summary: "Death is a state of unconscious sleep. When Jesus returns, the righteous dead will be resurrected to eternal life." },
    { id: 27, title: "The Millennium", summary: "The 1,000-year reign of the saints in heaven between the first and second resurrections, when sin is ultimately judged." },
    { id: 28, title: "The New Earth", summary: "God will create a new heaven and a new earth where righteousness dwells. We will live eternally with God, free from sin and pain." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 font-sans">
      <Head>
        <title>Spiritual Growth: 28 Beliefs Teaching | Samuel Oyunge</title>
      </Head>

      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-slate-700/50 rounded-full px-6 py-3 shadow-xl flex items-center justify-between">
        <Link href="/" className="font-extrabold bg-linear-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent text-xl">
          Samuel Oyunge
        </Link>
        <Link href="/" className="text-sm font-semibold px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
          ← Back to Home
        </Link>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-6xl">
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 dark:text-white pb-4 inline-block relative">
            Spiritual Growth
            <span className="absolute bottom-0 left-1/4 w-1/2 h-1.5 bg-linear-to-r from-purple-500 to-emerald-500 rounded-full" />
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-8 font-light">
            Teaching 5 Fundamental Beliefs to Children
          </p>
          <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-100 dark:border-slate-700 inline-block px-8 py-6 rounded-3xl text-left mx-auto mt-2 shadow-sm text-lg">
            <p className="text-slate-700 dark:text-slate-300 space-y-2">
              <span><strong className="text-emerald-600 dark:text-emerald-400">Target Audience:</strong> {classDetails.target}</span><br />
              <span><strong className="text-emerald-600 dark:text-emerald-400">Coordinator:</strong> {classDetails.teacher}</span><br />
              <span><strong className="text-emerald-600 dark:text-emerald-400">Timeline:</strong> {classDetails.date}</span><br />
              <span><strong className="text-emerald-600 dark:text-emerald-400">Format:</strong> {classDetails.duration}</span>
            </p>
          </div>
          <p className="mt-8 text-lg font-light max-w-3xl mx-auto text-slate-600 dark:text-slate-300 leading-relaxed">
            Using the <span className="italic font-semibold">&quot;God loves me 28 ways&quot;</span> study guide from the Youth Ministries department, I selected and adapted 5 key topics to teach our children during Sabbath School opening activities. Each lesson uses storytelling, hands-on illustrations, and Bible reading to plant seeds of faith.
          </p>
        </section>

        <section className="mb-20 animate-fade-in animation-delay-100">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white pb-4 mb-10 inline-block relative">
            📖 My Selected 5 Beliefs & Teaching Approach
            <span className="absolute bottom-0 left-0 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
          </h2>

          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                  {num === 1 && "1. Creation (Lesson 6 - God Made Me)"}
                  {num === 2 && "2. The Sabbath (Lesson 19 & 20 - Signs & God's Special Day)"}
                  {num === 3 && "3. Baptism (Lesson 15 - Healing Water)"}
                  {num === 4 && "4. The Remnant & Its Mission (Lesson 13 - The God Squad)"}
                  {num === 5 && "5. Second Coming & Death/Resurrection (Lesson 25 & 26 - Get Ready & Heaven's Flowers)"}
                </h3>
                <ul className="list-disc list-inside space-y-4 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                  {num === 1 && (
                    <>
                      <li><strong>Teaching Material:</strong> Used Lesson 6 of the Bible Adventures book which contrasts a literal 7-day Creation with evolution using the humorous story of Matt and his mom looking at a family photo album with a monkey in it.</li>
                      <li><strong>Illustration / Activity:</strong> Brought hand-drawn pictures of the 7 days of Creation printed on large cards. The children took turns walking from &quot;Day 1 (Light)&quot; to &quot;Day 7 (Rest)&quot; while naming what God made.</li>
                      <li><strong>Key Text:</strong> Genesis 1:1, 24-26.</li>
                    </>
                  )}
                  {num === 2 && (
                    <>
                      <li><strong>Teaching Material:</strong> Compared the Sabbath to a Birthday Party using Lesson 20&apos;s story of a dad celebrating his birthday, comparing the gifts, songs, and special day to how we worship God on Sabbath. Also used Lesson 19&apos;s traffic signs visual.</li>
                      <li><strong>Illustration / Activity:</strong> Drew a timeline on the whiteboard showing Sunday to Friday as workdays, and Saturday as a big smiling sun. We created a &quot;Traffic Sign for Life&quot; craft (like Lesson 19) and pasted Commandment #4 on it.</li>
                      <li><strong>Key Text:</strong> Genesis 2:2, 3; Mark 2:27, 28.</li>
                    </>
                  )}
                  {num === 3 && (
                    <>
                      <li><strong>Teaching Material:</strong> Used the story from Lesson 15 where farmer Alex watches his cows get a bath in water with special chemicals to protect them from sickness. We compared that to how we go under the water in baptism to wash away our sins and rise up clean.</li>
                      <li><strong>Illustration / Activity:</strong> Did a fun object lesson with a glass of water and a paper with a drawn &quot;sin&quot; scribble on it. When the paper was lowered into the water, the scribble disappeared (or the paper was symbolically &quot;cleaned&quot;).</li>
                      <li><strong>Key Text:</strong> Romans 6:4; Galatians 3:26, 27.</li>
                    </>
                  )}
                  {num === 4 && (
                    <>
                      <li><strong>Teaching Material:</strong> Used the inspiring story of Jessica and Rose (Lesson 13) who decided to be the &quot;God Squad&quot; by approaching a group of unfriendly girls on the playground to share God&apos;s love, even if they were rejected.</li>
                      <li><strong>Illustration / Activity:</strong> Designed a &quot;God Squad Badge&quot; coloring page for every child to take home. We discussed how God&apos;s remnant people aren&apos;t afraid to be different and share the Three Angels&apos; Messages with kindness.</li>
                      <li><strong>Key Text:</strong> Revelation 14:6-9; Matthew 22:14.</li>
                    </>
                  )}
                  {num === 5 && (
                    <>
                      <li><strong>Teaching Material:</strong> Combined two lessons. First, Lesson 25&apos;s story of Tasha cleaning her room to get ready for Aunt Dorothy, teaching us we must be ready for Jesus. Then Lesson 26&apos;s story of Albert and his mom walking through a field of flowers to explain how death is just a sleep and Jesus will wake us up.</li>
                      <li><strong>Illustration / Activity:</strong> I passed out a &quot;Heaven&apos;s Flowers&quot; coloring sheet and asked them to draw what they think Jesus&apos; voice will sound like when He calls them back from the grave.</li>
                      <li><strong>Key Text:</strong> 1 Thessalonians 4:16-17; John 5:28.</li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 animate-fade-in animation-delay-150">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white pb-4 mb-10 inline-block relative">
            📚 The Complete 28 Fundamental Beliefs (Reference)
            <span className="absolute bottom-0 left-0 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-10 leading-relaxed">
            Below is a complete list of the official 28 Fundamental Beliefs of the Seventh-day Adventist Church. These doctrines serve as a solid foundation for our faith. I have added brief 1-2 sentence summaries for quick study and memorization.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief) => (
              <div key={belief.id} className="bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-xl w-8 h-8 text-sm font-bold shrink-0 mt-1">
                    {belief.id}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
                      {belief.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {belief.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 bg-linear-to-br from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 p-10 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800/50 shadow-sm animate-fade-in animation-delay-200">
          <h2 className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-8 text-center">
            📸 Evidence of Teaching
          </h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-8 text-lg">
            Photos were taken during the Sabbath School opening activities (July–August 2026). Below is an example of the class setup with the children participating in the &quot;God Squad&quot; badge-making activity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 group">
              <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-700">
                <Image src="/images/profile.jpg" alt="Teaching the God Squad lesson" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <p className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-1">⭐ The God Squad Activity</p>
                <p className="text-slate-500 dark:text-slate-400">Date: Sabbath, July 26th, 2026</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 group">
              <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-700">
                <Image src="/images/profile.jpg" alt="Creation week card sorting" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <p className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-1">🌍 Creation Week Cards</p>
                <p className="text-slate-500 dark:text-slate-400">Date: Sabbath, August 2nd, 2026</p>
              </div>
            </div>
          </div>
        </section>
        <footer />
      </main>
    </div>
  );
}