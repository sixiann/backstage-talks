console.clear();

//page data
const colors = [
  "#ff608c",
  "white",
  "#00c1b5",
  "#ff651a",
  "#ffbe00",
  "#1d3fbb",
  "#e30512",
];

const data = [];
let issueNumber = 7;

for (let i = 0; i < 7; i++) {
  data.push({
    color: colors[i],
    imgUrl: `https://backstagetalks.com/img/backstagetalks_cover_issue_${issueNumber}.png`,
    text: `
            <p>Issue #${issueNumber}</p>
            <p>BUY HERE (Europe)</p>
            <p>BUY HERE (UK & Overseas)</p>
            <p>or in selected stores</p>
        `,
  });
  issueNumber--;
}

data[5].imgUrl = "https://backstagetalks.com/img/backstagetalks_cover2017.png";
data[6].imgUrl =
  "https://backstagetalks.com/img/backstagetalks_cover2016_n.png";

//add data to sections and anchor links to fixed element
const sectionsContainer = document.getElementById("sections-container");
const linksContainer = document.getElementById("links-container");

data.forEach((item, index) => {
  const anchor = document.createElement("a");
  anchor.href = `#section-${index}`;
  anchor.textContent = `Issue #${7 - index}`;
  anchor.className = "issue-link";

  const linkWrapper = document.createElement("div");
  linkWrapper.appendChild(anchor);

  linksContainer.appendChild(linkWrapper);

  const section = document.createElement("section");
  section.classList.add("flex-center", "section");
  section.dataset.bgcolor = item.color;
  section.id = `section-${index}`;
  section.innerHTML = `
  
        <div class="row">
            <div class="col-lg-3 "></div>
            <div class="col-lg-6 flex-center flex-column p-5">      
                <img src="${item.imgUrl}" class="img-fluid">
                ${item.text}
            </div>
            <div class="col-lg-3 "></div>
        </div>
    `;

  sectionsContainer.appendChild(section);
});

// scrolling effect --> change background color and snap scroll
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".section");

const switchColor = (color) => {
  gsap.to(document.body, {
    duration: 0.3,
    ease: "power1.inOut",
    backgroundColor: color,
    overwrite: "auto",
  });
};



//change background color for each section
sections.forEach((section, i) => {
  const color = section.dataset.bgcolor;
  const previousColor = sections[i - 1]
    ? sections[i - 1].dataset.bgcolor
    : "#e30512";

  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => switchColor(color),
    onEnterBack: () => i === sections.length - 1 && switchColor(color),
    onLeave: () => i === sections.length - 1 && switchColor("#e30512"),
    onLeaveBack: () => switchColor(previousColor),
    id: i + 1,
  });

  // ScrollTrigger.create({
  //   trigger: section,
  //   start: "top",
  //   end: "bottom",
  //   //snapscroll
  //   pin: true,
  // });
});

// scroll snapping only for big screens
ScrollTrigger.matchMedia({
  "(min-width: 1000px)": function() {
    // ScrollTriggers for larger screens
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top",
        end: "bottom",
        //snapscroll
        pin: true,
      });
    });
  },
});


// scrolling effect --> smooth scrolling between sections for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
