import CountUp from "react-countup";
import aboutPetaniPhoto from "../assets/content/about.png";
import maps from "../assets/content/maps.png";
import membersJoin from "../assets/content/members.png";
import colorLogo from "../assets/logo/color.png";
import Container from "../component/container.component";
import Header from "../component/content/header.section";
import { headerAbout } from "../constant/content/about";
import {
  achievements,
  headerAchievement,
} from "../constant/content/achievement";
import { contact } from "../constant/content/contact";
import { headerMembers, members } from "../constant/content/members";
import { headerProduct, products } from "../constant/content/product";
import { headerPrograms, programs } from "../constant/content/program";
import { socials } from "../constant/content/social";
import { headerTeam, teams } from "../constant/content/team";
import { useScrollClick } from "../hooks/useScrollClick";

function HomePage() {
  const { handleScrollClick } = useScrollClick();
  return (
    <>
      <Container className="flex items-center min-h-screen">
        <div className="hero justify-start text-white space-y-5 text-balance">
          <div className="hero-content flex flex-col items-start max-w-[640px]">
            <h3 className="text-[44px] tracking-wide font-semibold leading-[1.2]">
              Pionir Digitalisasi Ekonomi Kerakyatan melalui Koperasi Modern
              Berbasis Teknologi
            </h3>
            <p className="text-[20px] tracking-wider font-light">
              Menggerakkan ekonomi kerakyatan melalui koperasi modern berbasis
              teknologi untuk masa depan yang lebih baik.
            </p>
            <div className="flex mt-14 space-x-5">
              <img
                className="block h-12"
                src={membersJoin}
                alt="group-members"
              />
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold">120+</span>
                <span className="tracking-widest font-light">Anggota</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container id="product" className="py-10">
        <Header {...headerProduct} />
        <div className="flex gap-8 mt-14">
          {products.map((item, index) => (
            <List key={`product-${index}`} {...item} />
          ))}
        </div>
      </Container>
      <Container id="about" className="flex justify-between gap-12 py-16">
        <Header direction="left" className="max-w-[600px]" {...headerAbout} />
        <div className="block w-5/12 h-[500px] overflow-hidden rounded-xl ">
          <img
            src={aboutPetaniPhoto}
            className="w-full h-full object-cover object-center"
            alt="teentang petani"
          />
        </div>
      </Container>
      <Container id="achievement" className="py-24 flex items-center gap-24">
        <Header
          direction="left"
          className="max-w-[600px]"
          {...headerAchievement}
        />
        <div className="grid grid-cols-2 gap-11">
          {achievements.map(({ label, value }, index) => (
            <div
              key={`achievement-${index}`}
              className="flex flex-col items-center justify-center gap-2"
            >
              <span className="text-5xl font-bold">
                {index < achievements.length - 1 ? (
                  <div className="flex">
                    <CountUp
                      className="text-emeraldGreen font-bold"
                      end={value}
                      scrollSpyOnce
                      enableScrollSpy
                    />
                    <span>+</span>
                  </div>
                ) : (
                  <div className="flex items-end">
                    <span>Rp +</span>
                    <CountUp
                      className="text-emeraldGreen font-bold"
                      end={value}
                      scrollSpyOnce
                      enableScrollSpy
                    />
                    <span className="text-3xl ml-1">Jt</span>
                  </div>
                )}
              </span>
              <span className="text-sm font-light tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </Container>
      <Container id="member" className="py-10">
        <Header {...headerMembers} />
        <div className="flex gap-8 mt-14">
          {members.map((item, index) => (
            <List key={`member-${index}`} {...item} />
          ))}
        </div>
      </Container>
      <div className="bg-deepBlue">
        <Container
          id="program"
          className=" py-24 flex items-center gap-24 text-white"
        >
          <Header
            direction="left"
            className="max-w-[600px]"
            isTextWhite
            {...headerPrograms}
          />
          <div className="grid grid-cols-2 gap-12">
            {programs.map(({ title, description }, index) => (
              <div
                key={`program-${index}`}
                className="flex flex-col items-start gap-2"
              >
                <span className="text-xl font-medium tracking-wider">
                  {title}
                </span>
                <span className="text-sm font-light tracking-wide">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <Container id="team" className="py-10">
        <Header {...headerTeam} />
        <div className="flex gap-8 mt-14">
          {teams.map(({ photoPath, position, name }, index) => (
            <div
              key={`team-${index}`}
              className="flex flex-col items-center gap-5 justify-between"
            >
              <div className="bg-darkMetal rounded-lg cursor-pointer image-container">
                <img
                  className="image-zoom"
                  src={photoPath}
                  alt={`photo-team-${index}`}
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm text-slate-500">{position}</h3>
                <p className="font-semibold">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <div id="network">
        <img
          className="block w-full h-auto mt-20"
          src={maps}
          alt="office-map"
        />
      </div>

      <div className="border-t-4 border-t-emeraldGreen"></div>
      <Container className="pt-16 pb-10">
        <div className="flex items-start justify-between">
          <div>
            <div>
              <a href="top" onClick={handleScrollClick}>
                <img className="h-10" src={colorLogo} alt="color-logo" />
              </a>
              <p className="max-w-64 mt-5 font-semibold">
                Kolaborasi untuk Kesejahteraan, Inovasi untuk Masa Depan.
              </p>
            </div>
            <div className="mt-20">
              <div className="flex gap-3">
                {socials.map(({ link, icon: Icon }, index) => (
                  <a key={`social-${index}`} href={link} target="_blank">
                    <Icon />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-500">
                © 2025 Kometa. All Rights Reserved
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-xs">
            {contact.map(({ icon: Icon, description }, index) => (
              <div
                key={`contact-${index}`}
                className={`flex gap-3 cursor-pointer ${
                  index == 0 ? "items-start" : "items-center"
                }`}
              >
                <span
                  className={`${
                    index == 0 ? "pt-1" : ""
                  } min-w-7 flex justify-center items-center`}
                >
                  <Icon />
                </span>
                <span className="text-sm text-gray-500">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

function List({
  icon: Icon,
  title,
  description,
}: {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col">
      <Icon />
      <h2 className="mt-6 text-lg font-medium text-slate-700">{title}</h2>
      <p className="mt-2 tracking-wide text-sm text-slate-400">{description}</p>
    </div>
  );
}

export default HomePage;
