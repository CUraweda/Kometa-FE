import CountUp from "react-countup";
import aboutPetaniPhoto from "../assets/content/about.png";
import colorLogo from "../assets/logo/color.png";
import Container from "../component/content/container.component";
import Header from "../component/content/header.section";
import CustomMap from "../component/ui/maps";
import { headerAbout } from "../constant/content/about";
import {
  achievements,
  headerAchievement,
} from "../constant/content/achievement";
import { contact } from "../constant/content/contact";
import {
  dummyPhoto,
  headerMembers,
  members,
} from "../constant/content/members";
import { headerProduct, products } from "../constant/content/product";
import { headerPrograms, programs } from "../constant/content/program";
import { socials } from "../constant/content/social";
import { headerTeam, teams } from "../constant/content/team";
import { useScrollClick } from "../hooks/useScrollClick";

function HomePage() {
  const { handleScrollClick } = useScrollClick();
  return (
    <>
      <Container className="flex items-center min-h-screen ">
        <div className="hero justify-start text-white space-y-5 text-balance">
          <div className="hero-content flex flex-col items-start max-w-[60rem]">
            <p className="text-2xl sm:text-5xl tracking-wide font-semibold leading-[1.2]">
              Pionir Digitalisasi Ekonomi Kerakyatan melalui Koperasi Modern
              Berbasis Teknologi
            </p>
            <p className="text-sm sm:text-xl tracking-wider font-light">
              Menggerakkan ekonomi kerakyatan melalui koperasi modern berbasis
              teknologi untuk masa depan yang lebih baik.
            </p>
            <div className="flex mt-14 space-x-5">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {dummyPhoto.map((item) => (
                  <div className="avatar">
                    <div className="w-10">
                      <img key={item} src={item} alt={item} loading="eager" />
                    </div>
                  </div>
                ))}
              </div>
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
        <div className="flex mt-14  flex-wrap">
          {products.map((item, index) => (
            <List key={`product-${index}`} {...item} />
          ))}
        </div>
      </Container>
      <div className="bg-gray-100">
        <Container
          id="about"
          className="flex justify-between flex-wrap items-center py-16 "
        >
          <Header
            direction="left"
            className="w-full sm:w-1/2 items-center sm:items-start text-center sm:text-start"
            {...headerAbout}
          />
          <div className="block w-full sm:w-5/12 h-[500px] overflow-hidden p-4 mt-5 ">
            <img
              src={aboutPetaniPhoto}
              className="w-full h-full object-cover object-center rounded-xl"
              alt="teentang petani"
            />
          </div>
        </Container>
      </div>
      <Container
        id="achievement"
        className="py-24 flex flex-wrap px-3 items-center gap-10"
      >
        <Header
          direction="left"
          className="w-full sm:w-1/2 items-center sm:items-start text-center sm:text-start"
          {...headerAchievement}
        />
        <div className="w-full sm:w-5/12">
          <div className="grid grid-cols-2 gap-11">
            {achievements.map(({ label, value }, index) => (
              <div
                key={`achievement-${index}`}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-3xl sm:text-5xl font-bold">
                  {index < achievements.length - 1 ? (
                    <div className="flex text-emeraldGreen">
                      <CountUp
                        className=" font-bold"
                        end={value}
                        scrollSpyOnce
                        enableScrollSpy
                      />
                      <span>+</span>
                    </div>
                  ) : (
                    <div className="flex items-end text-emeraldGreen">
                      <span>Rp +</span>
                      <CountUp
                        className="font-bold"
                        end={value}
                        scrollSpyOnce
                        enableScrollSpy
                      />
                      <span>Jt</span>
                    </div>
                  )}
                </span>
                <span className="text-sm font-light tracking-wide text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Container id="member" className="py-10">
        <Header {...headerMembers} />
        <div className="flex mt-14  flex-wrap">
          {members.map((item, index) => (
            <List key={`member-${index}`} {...item} />
          ))}
        </div>
      </Container>
      <div className="bg-deepBlue">
        <Container
          id="program"
          className="py-24 px-5 flex flex-wrap items-center gap-24 text-white"
        >
          <Header
            direction="left"
            className="w-full sm:w-1/2 items-center sm:items-start text-center sm:text-start"
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
      <Container id="team" className="py-10 p-3">
        <Header {...headerTeam} />
        <div className="flex flex-wrap  mt-14">
          {teams.map(({ photoPath, position, name }, index) => (
            <div
              key={`team-${index}`}
              className="w-full sm:w-1/4 p-3 flex flex-col items-center justify-between"
            >
              <div className="bg-darkMetal rounded-lg cursor-pointer image-container">
                <img
                  className="image-zoom"
                  src={photoPath}
                  alt={`photo-team-${index}`}
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-sm text-slate-500">{position}</h3>
                <p className="font-semibold">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <div id="network">
        <CustomMap />
      </div>

      <div className="border-t-4 border-t-emeraldGreen"></div>
      <Container className="pt-16 pb-10 px-3">
        <div className="">
          <div className="flex flex-wrap w-full  ">
            <div className="w-full sm:w-1/3 p-4">
              <a href="top" onClick={handleScrollClick}>
                <img
                  className="h-10"
                  src={colorLogo}
                  alt="color-logo"
                  loading="eager"
                />
              </a>
              <p className="max-w-64 mt-5 font-semibold">
                Kolaborasi untuk Kesejahteraan, Inovasi untuk Masa Depan.
              </p>
            </div>
            <div className="w-full sm:w-1/3 p-4 ">
              <div className="flex gap-3">
                {socials.map(({ link, icon: Icon }, index) => (
                  <a key={`social-${index}`} href={link} target="_blank">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-1/3 gap-3 p-4 flex flex-col">
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
          <p className="mt-10 text-center text-sm text-slate-500">
            © 2025 Kometa. All Rights Reserved
          </p>
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
    <div className="w-full sm:w-1/4 items-center sm:items-start text-center sm:text-start flex flex-col p-4">
      <Icon />
      <h2 className="mt-6 text-lg font-medium text-slate-700">{title}</h2>
      <p className="mt-2 tracking-wide text-sm text-slate-400">{description}</p>
    </div>
  );
}

export default HomePage;
