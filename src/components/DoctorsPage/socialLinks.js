import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const socialLinks = [
  {
    id: uuidv4(),
    url: 'https://twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: uuidv4(),
    url: 'https://facebook.com',
    icon: <FaFacebookF />,
  },
  {
    id: uuidv4(),
    url: 'https://www.linkedin.com',
    icon: <FaLinkedinIn />,
  },
  {
    id: uuidv4(),
    url: 'https://github.com',
    icon: <FaGithub />,
  },
];

export default socialLinks;
