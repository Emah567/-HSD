window.addEventListener('load', () => {

    AOS.init({
        offset: 80
    });
    // #Page Smooth Scroll 
    const body = document.body;
    const scrollWrap = document.querySelector(".smooth-scroll-wrap");
    const height = scrollWrap.getBoundingClientRect().height - 1;
    const speed = 0.04;
    let offset = 0;

    body.style.height = Math.floor(height) + "px";

    function smoothScroll() {
        offset += (window.pageYOffset - offset) * speed;
        const scroll = "translateY(-" + offset + "px) translateZ(0)";
        scrollWrap.style.transform = scroll;
        requestAnimationFrame(smoothScroll);
    }
    smoothScroll(); // For Repeating

    // Adjust for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 50; // increasing or decreasing this (50) value is inpact on top offset
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adjust for footer links
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 50; // increasing or decreasing this (50) value is inpact on offset of top
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (document.querySelector(".menu-btn")) {
        document.querySelector(".menu-btn").addEventListener("click", function () {
            document.querySelector(".header_area").classList.toggle("active");  //Toggle Menu
        });
    }
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("click", () => {
            document.querySelector(".header_area").classList.remove("active");
        }); // # remove active class from header if (click) 
    }

    const cpyBtn = document.querySelector("#cpyBtn");
    if (cpyBtn) {
        cpyBtn.onclick = () => {
            const inputField = document.querySelector(".cpy-text").value;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(inputField).then(() => {
                    document.querySelector(".address").classList.add("active");
                    document.querySelector(".cpy-status").innerHTML = "Copied!:" + " ";
                }).catch(err => {
                    console.error("Failed to copy text: ", err);
                });
            } else {
                // Fallback for browsers that don't support the Clipboard API
                const textarea = document.createElement("textarea");
                textarea.value = inputField;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    document.querySelector(".address").classList.add("active");
                    document.querySelector(".cpy-status").innerHTML = "Copied!:" + " ";
                } catch (err) {
                    console.error("Failed to copy text: ", err);
                }
                document.body.removeChild(textarea);
            }
        };  //Text copy
    }

    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.onclick = () => {
            document.querySelector(".header_area").classList.remove("active");
        }
    });  //remove active class from Header if user click on navLink


    // # ============ FUll screen video Toggle ===========
    const fullScreenVideo = document.querySelector(".full-scrn-vid");
    const fullScreenVideoWrap = document.querySelector(".full-scrn-vid-wrap");

    if (document.querySelector(".full-scrn-ext-btn")) {
        document.querySelector(".full-scrn-ext-btn").onclick = () => {
            fullScreenVideoWrap.classList.remove("active");
            document.querySelector('body').classList.remove("unactive");
        };  //Exit full screen
    }
    if (document.querySelector(".vid-ply-btn")) {
        document.querySelector(".vid-ply-btn").onclick = () => {
            fullScreenVideoWrap.classList.add("active");
            document.querySelector('body').classList.add("unactive");
        };  //Enter full screen
    }

    if (fullScreenVideoWrap) {
        fullScreenVideoWrap.addEventListener("click", function (event) {
            fullScreenVideoWrap.classList.remove("active");
            document.querySelector('body').classList.remove("unactive");
            event.stopPropagation();
        });  //Exit full screen if user click outside
    }

    if (fullScreenVideo) {
        fullScreenVideo.addEventListener("click", function (event) {
            event.stopPropagation();
        });  // Stay exploring if user click inside
    }


    let CTRP = document.querySelector('.CTRP-wrap');
    let CTRP_contents = document.querySelector('.CTRP-contents-wrap');

    if (document.querySelector(".CTRP-btn")) {
        document.querySelector(".CTRP-btn").onclick = () => {
            document.querySelector(".CTRP-wrap").classList.add("active");
            document.querySelector('body').classList.add("unactive");
        };  //Enter full screen
    }

    if (document.querySelector("#checkmark")) {
        document.querySelector("#checkmark").onclick = () => {
            document.querySelector(".CTRP-wrap").classList.remove("active");
            document.querySelector('body').classList.remove("unactive");
        };  //Exit full screen
    }

    if (CTRP) {
        CTRP.addEventListener("click", function (event) {
            CTRP.classList.remove("active");
            document.querySelector('body').classList.remove("unactive");
            event.stopPropagation();
        });   //Exit if click outside
    }

    if (CTRP_contents) {
        CTRP_contents.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    const prcsNav = document.querySelector('.prcs-nav');
    const prcsStpIdx = document.querySelector('.prcs-stp-idx');
    const prcsTitle = document.querySelector('.prcs-title');
    const prcsDescription = document.querySelector('.description.prcs');
    const prcsNext2 = document.querySelector('.prcsNext');

    const stepsData = [
        {
            title: "Download phantom wallet:",
            description: "Download &amp; install the phantom wallet either from the ap store on your phone or the browser extension for desktop."
        },
        {
            title: "Buy some Solana:",
            description: "Purchase $SOL from an exchange or bridge $SOL and send it to your Phantom wallet."
        },
        {
            title: "Buy $HSD:",
            description: "Go to Decentralized Exchanges (DEXs): Dexscreener or pump.fun, and paste the $HSD contract address listed on this website to swap your SOL for HSD."
        },
        {
            title: "Add $HSD to Your Wallet:",
            description: "Add $HSD contract address to your Phantom Wallet for your $HSD tokens to show. Let&#x27;s get HSD!."
        },
     
    ];  //How to Buy Process

    let currentStepIndex = 0;  //Initialize current step index

    function updateStepContent(index) {
        if (prcsStpIdx || prcsTitle || prcsDescription) {
            prcsStpIdx.textContent = index + 1;
            prcsTitle.innerHTML = stepsData[index].title;
            prcsDescription.innerHTML = stepsData[index].description;
        }
    }

    //Initialize steps
    for (let i = 0; i < stepsData.length; i++) {
        let prcsLi = document.createElement("li");
        prcsLi.classList.add("prcs-step");
        if (prcsNav) {
            prcsNav.appendChild(prcsLi);
        }

        prcsLi.addEventListener("click", function () {
            document.querySelectorAll(".prcs-step").forEach(item => {
                item.classList.remove("active");
            });
            prcsLi.classList.add("active");
            currentStepIndex = i;  //Update current step index
            updateStepContent(i);
        });
    }

    //Initial content setup
    updateStepContent(0);
    if (prcsNav) {
        prcsNav.children[0].classList.add("active");
    }

    //Button click handler
    if (prcsNext2) {
        prcsNext2.addEventListener("click", function () {
            currentStepIndex = (currentStepIndex + 1) % stepsData.length;

            // Update active step in navigation
            document.querySelectorAll(".prcs-step").forEach(item => {
                item.classList.remove("active");
            });
            prcsNav.children[currentStepIndex].classList.add("active");
            updateStepContent(currentStepIndex);
        });

    }


    if (document.querySelector('.faq')) {
        document.querySelectorAll('.faq').forEach(faq => {
            faq.addEventListener('click', (event) => {
                event.currentTarget.classList.toggle('active');
            });
        });  // FAQ Q & A Toggler
    }

    //# Chart Control
    Chart.register(ChartDataLabels);
    const myPieChart = document.querySelector("#myPieChart");
    if (myPieChart) {
        const ctx = myPieChart.getContext('2d');
        const data = {
            labels: ['50%', '25%', '15%', '10%'],
            datasets: [{
                data: [50, 25, 16, 10],
                backgroundColor: [
                    'rgba(121, 204, 158, 1)',
                    'rgba(255, 135, 23, 1)',
                    'rgba(226, 254, 165, 1)',
                    'rgba(248, 255, 232, 1)'
                ],
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 4
            }]
        };

        const options = {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true  // Set to true to enable tooltips on hover
                },
                datalabels: {
                    display: false
                }
            },
            cutout: '32%',
            responsive: true,
            maintainAspectRatio: false,
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }
})
