import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.scss";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const index = () => {
  return (
    <footer className="w-full px-20 pt-20 pb-5 bg-[#F1F1F1] relative">
      <div className="flex flex-col p-10 gap-20 bg-[#CCCECF] relative z-10">
        <div className="w-full flex justify-between">
          <div>
            <img
              src="/images/palladium-logo.png"
              alt="company logo"
              className="w-[320px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h5 className="text-end text-2xl">
                Fabrika <FontAwesomeIcon icon={faLocationDot} />
              </h5>
            </div>
            <div>
              <span>
                İstanbul Cd. Karaağaç Mh. No: 20A Büyükçekmece / İstanbul
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div>
            <div className="flex items-center gap-5">
              <FontAwesomeIcon icon={faPhone} size="2x" />
              <div className="w-full flex flex-col">
                <a href="tel:+90 850 360 01 01">+90 850 360 01 01</a>
                <a href="tel:+90 551 254 00 00">+90 551 254 00 00</a>
              </div>
            </div>
          </div>

          <div>
            <div>
              <a href="mailto:info@palladium.gen.tr" className="text-xl">
                bizimle iletişime geçin
              </a>
            </div>
            <div>
              <a href="#">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default index;
