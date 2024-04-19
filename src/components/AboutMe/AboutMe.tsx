import React from 'react';

import imgSource from '../../assets/AboutMe/about_img.png';

import styles from './AboutMe.module.css';

function AboutMe() {
    return (
        <div className={styles.aboutMe}>
            <div className="container">
                <img src={imgSource} alt="Beautiful stairs" className={styles.img} />
                <div className={styles.content}>
                    <h1 className={styles.title}>About me</h1>
                    <p className={styles.text}>
                        Hi! My name is Anton and I&apos;m a Junior Frontend Developer. I am already familiar with main Web Technologies like
                        React, HTML, CSS, JavaScript and Git version control system. <br /> <br />
                        This page was developed during the course&#32;
                        <a href="https://www.mastersacademy.education/" target="_black" className={styles.link}>
                            &apos;Intro to React&apos;
                        </a>
                        &#32;from Masters Academy in 2024. <br /> <br />
                        This is a social project from MOCG company where I got an opportunity to work with Frontend mentors and to create my
                        own small project for the portfolio. <br /> <br /> You can contact me via&#32;
                        <a href="https://www.linkedin.com/in/anton-oxota/" target="_black" className={styles.link}>
                            LinkedIn
                        </a>
                        &#32;and check out my&#32;
                        <a href="https://github.com/anton-oxota" target="_black" className={styles.link}>
                            GitHub
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
