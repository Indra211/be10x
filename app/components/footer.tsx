import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
const Footer = () => {
  return (
    <footer>
      <div className='flex flex-col items-center text-center'>
        <div className='flex space-x-4'>
          <span>
            <a
              href='https://indra211.github.io/myportfolio/'
              target='_blank'
              rel='noreferrer'
            >
              <MdAccountCircle className='w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-slate-700 hover:text-slate-600' />
            </a>
          </span>
          <span>
            <a
              href='https://github.com/Indra211'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub className='w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-slate-700 hover:text-slate-600' />
            </a>
          </span>
          <span>
            <a
              href='https://www.linkedin.com/in/cherukuru-indrasena-reddy-b9717b228/'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedin className='w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-slate-700 hover:text-slate-600' />
            </a>
          </span>
        </div>
        <p className=''>
          © 2024. All rights reserved. Designed by{' '}
          <span className='font-bold text-slate-700'>
            Cherukuru Indrasena Reddy
          </span>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
