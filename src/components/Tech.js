import React from 'react';
import '../Tech.css';
import { FaReact, FaHtml5, FaCss3, FaPhp, FaJava, FaGitSquare, FaGithub, FaFigma } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io";
import { SiFirebase, SiKotlin, SiPython, SiTypescript } from "react-icons/si";
import { DiMysql } from "react-icons/di";

function Tech() {
  return (
    <div className="TechContainer">
      <div className="StacksText">
        STACKS <span className="divider"></span>
      </div>
      <div className="TechScrollWrapper">
        <ul className="TechScroll">
          <li className="TechItem"><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"><FaReact /></a></li>
          <li className="TechItem"><a href="https://reactnative.dev/" target="_blank" rel="noopener noreferrer"><TbBrandReactNative /></a></li>
          <li className="TechItem"><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" target="_blank" rel="noopener noreferrer"><FaHtml5 /></a></li>
          <li className="TechItem"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer"><FaCss3 /></a></li>
          <li className="TechItem"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer"><IoLogoJavascript /></a></li>
          <li className="TechItem"><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><SiTypescript /></a></li>
          <li className="TechItem"><a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer"><DiMysql /></a></li>
          <li className="TechItem"><a href="https://www.php.net/" target="_blank" rel="noopener noreferrer"><FaPhp /></a></li>
          <li className="TechItem"><a href="https://www.java.com/" target="_blank" rel="noopener noreferrer"><FaJava /></a></li>
          <li className="TechItem"><a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer"><FaGitSquare /></a></li>
          <li className="TechItem"><a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
          <li className="TechItem"><a href="https://kotlinlang.org/" target="_blank" rel="noopener noreferrer"><SiKotlin /></a></li>
          <li className="TechItem"><a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer"><FaFigma/></a></li>
          <li className="TechItem"><a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer"><SiFirebase/></a></li>
          <li className="TechItem"><a href="https://www.python.org/" target="_blank" rel="noopener noreferrer"><SiPython/></a></li>
        </ul>
      </div>
    </div>
  );
}

export default Tech;
