import React from 'react';

import FbIcon from '../../assets/icons/fb.svg?react';
import IstagramIcon from '../../assets/icons/insta.svg?react';
import LinkedInIcon from '../../assets/icons/linkedin.svg?react';
import SocialIcon from '../SocialIcon/SocialIcon';

import styles from './Socials.module.css';

function Socials({ className, ...restProps }: React.ComponentProps<'ul'>) {
    return (
        <ul className={`${styles.socials} ${className}`} {...restProps}>
            <SocialIcon href="https://www.facebook.com/">
                <FbIcon />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/">
                <LinkedInIcon />
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/">
                <IstagramIcon />
            </SocialIcon>
        </ul>
    );
}

export default Socials;
