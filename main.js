import "./style.css";
import $ from "jquery";
import "jquery-scrollify";
import anime from "animejs/lib/anime.es.js";

$(function () {
  $.scrollify({
    section: ".section",
    scrollSpeed: 300,
    easing: "easeOutExpo",
    updateHash: true,
  });
});

function animateText(id, text, color) {
  const textElement = document.getElementById(id);
  textElement.textContent = text;
  textElement.style.color = color;

  anime({
    targets: textElement,
    opacity: [0, 1],
    translateY: [-50, 0],
    scale: [0.5, 1],
    rotate: ["-20deg", "0deg"],
    easing: "easeInOutQuad",
    duration: 1200,
    delay: anime.stagger(10),
  });
}

function createHearts(containerId, color) {
  return setInterval(function () {
    var r_num = Math.floor(Math.random() * 40) + 10;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_time = Math.floor(Math.random() * 5) + 5;

    $(`#${containerId}`).append(
      `<div class='heart' style='width:${r_size}px;height:${r_size}px;left:${r_left}%;background:rgba(${color.r},${color.g},${color.b},1);-webkit-animation:love ${r_time}s ease;-moz-animation:love ${r_time}s ease;-ms-animation:love ${r_time}s ease;animation:love ${r_time}s ease'></div>`
    );

    $(`#${containerId}`).append(
      `<div class='heart' style='width:${r_size - 10}px;height:${r_size - 10
      }px;left:${r_left + r_num}%;background:rgba(${color.r},${color.g},${color.b + 25
      },1);-webkit-animation:love ${r_time + 5}s ease;-moz-animation:love ${r_time + 5
      }s ease;-ms-animation:love ${r_time + 5}s ease;animation:love ${r_time + 5
      }s ease'></div>`
    );

    $(".heart").each(function () {
      var top = $(this)
        .css("top")
        .replace(/[^-\d\.]/g, "");
      var width = $(this)
        .css("width")
        .replace(/[^-\d\.]/g, "");
      if (top <= -100 || width >= 150) {
        $(this).detach();
      }
    });
  }, 300);
}

function getSectionColor(sectionIndex) {
  const colors = [
    { r: 255, g: 179, b: 167 },
    { r: 163, g: 207, b: 255 },
    { r: 168, g: 230, b: 207 },
    { r: 255, g: 249, b: 176 },
    { r: 255, g: 210, b: 235 },
    { r: 235, g: 201, b: 255 },
    { r: 204, g: 240, b: 255 },
  ];
  return colors[sectionIndex];
}

let intervals = [];
$(window).on("scroll", function () {
  const scrollPos = $(window).scrollTop();
  const windowHeight = window.innerHeight;

  $(".section").each(function (index) {
    const sectionTop = $(this).offset().top;
    const sectionHeight = $(this).outerHeight();

    if (
      scrollPos >= sectionTop - windowHeight &&
      scrollPos < sectionTop + sectionHeight
    ) {
      if (!intervals[index]) {
        const color = getSectionColor(index);
        intervals[index] = createHearts(`hearts${index + 1}`, color);

        const texts = [
          { text: "C Днем Рождения, Алина!!",                 color: "#D50032" },
          { text: "Желаю домик в Польше!",             color: "#004D80" },
          { text: "Три красных Порше!",                color: "#00695C" },
          { text: "И денег побольше!",                   color: "#00695C" },
          { text: "Всего самого наилучшего и прекрасного!",          color: "#B0004F" },
          { text: "И улыбнись! У тебя очень милая улыбка!)", color: "#5A2D8E" },
          { text: "Ты крутая! Продолжай сиять ✨",      color: "#006A8A" }
    ];
        animateText(
          `typewriter${index + 1}`,
          texts[index].text,
          texts[index].color
        );
      }
    } else {
      if (intervals[index]) {
        clearInterval(intervals[index]);
        intervals[index] = null;
      }
    }
  });
});

const firstSectionColor = getSectionColor(0);
intervals[0] = createHearts("hearts1", firstSectionColor);

// Разметка
document.querySelector("#app").innerHTML = `
  <div class="wrapper_text">
    <div class="section" style="height: 100vh; background-color: #FFE5D9;">
      <div class="bg_heart" id="hearts1"></div>
      <h1 id="typewriter1"></h1>
    </div>
    <div class="section" style="height: 100vh; background-color: #DDEFFF;">
      <div class="bg_heart" id="hearts2"></div>
      <h1 id="typewriter2"></h1>
    </div>
    <div class="section" style="height: 100vh; background-color: #DFFFE2;">
      <div class="bg_heart" id="hearts3"></div>
      <h1 id="typewriter3"></h1>
    </div>
    <div class="section" style="height: 100vh; background-color: #FFFDE1;">
      <div class="bg_heart" id="hearts4"></div>
      <h1 id="typewriter4"></h1>
    </div>
    <div class="section" style="height:100vh;background-color:#FFD2EB;">
      <div class="bg_heart" id="hearts5"></div>
      <h1 id="typewriter5"></h1>
    </div>
    <div class="section" style="height:100vh;background-color:#EBC9FF;">
      <div class="bg_heart" id="hearts6"></div>
      <h1 id="typewriter6"></h1>
    </div>
    <div class="section" style="height:100vh;background-color:#CCF0FF;">
      <div class="bg_heart" id="hearts7"></div>
      <h1 id="typewriter7"></h1>
    </div>                                                        
  </div>
`;

// Добавляем текст для первой секции сразу
const mainText = { text: "C Днем Рождения, Алина!!", color: "#D50032" };

document.addEventListener("DOMContentLoaded", function () {
  animateText("typewriter1", mainText.text, mainText.color);
});
