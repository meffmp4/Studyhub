/* ======================================
   STUDYHUB — ОБЩИЙ JAVASCRIPT
====================================== */


/* ======================================
   1. АНИМАЦИЯ ПОЯВЛЕНИЯ
====================================== */

const elements = document.querySelectorAll(
    ".card, .subject-card, .material-card, .task, .planner-progress, .schedule, .quote"
);

const observer = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


elements.forEach(function(element) {

    element.classList.add("animate");

    observer.observe(element);

});


/* ======================================
   2. КНОПКИ ПРЕДМЕТОВ
====================================== */

const subjectButtons =
    document.querySelectorAll(".subject-button");


subjectButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card =
            button.closest(".subject-card");

        const subject =
            card.querySelector("h2").textContent;

        openModal(
            "📚 " + subject,
            "Ты выбрала предмет «" +
            subject +
            "». Здесь можно разместить подробные уроки, задания и конспекты."
        );

    });

});


/* ======================================
   3. КНОПКИ МАТЕРИАЛОВ
====================================== */

const materialButtons =
    document.querySelectorAll(".material-button");


materialButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card =
            button.closest(".material-card");

        const title =
            card.querySelector("h2").textContent;

        const description =
            card.querySelector("p").textContent;

        openModal(
            "📖 " + title,
            description
        );

    });

});


/* ======================================
   4. МОДАЛЬНОЕ ОКНО
====================================== */

function openModal(title, text) {

    const oldModal =
        document.querySelector(".modal");

    if (oldModal) {
        oldModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.className = "modal";


    modal.innerHTML = `

        <div class="modal-content">

            <button class="close">
                ×
            </button>

            <h2>${title}</h2>

            <p>
                ${text}
            </p>

            <div class="modal-tip">

                💡 <strong>Совет:</strong>

                Разделяй большие темы
                на маленькие части и
                повторяй их постепенно.

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    setTimeout(function() {

        modal.classList.add("show");

    }, 10);


    const close =
        modal.querySelector(".close");


    close.addEventListener(
        "click",
        function() {

            closeModal(modal);

        }
    );


    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {

                closeModal(modal);

            }

        }
    );

}


function closeModal(modal) {

    modal.classList.remove("show");

    setTimeout(function() {

        modal.remove();

    }, 300);

}


/* ======================================
   5. ПЛАНИРОВЩИК
====================================== */

const tasks =
    document.querySelectorAll(".task");


tasks.forEach(function(task) {

    const checkbox =
        task.querySelector(".checkbox");


    checkbox.addEventListener(
        "click",
        function() {

            task.classList.toggle("completed");


            if (task.classList.contains("completed")) {

                checkbox.textContent = "✓";

                const status =
                    task.querySelector(".todo");

                if (status) {

                    status.className = "done";

                    status.textContent =
                        "Выполнено";

                }

            } else {

                checkbox.textContent = "";

                const status =
                    task.querySelector(".done");

                if (status) {

                    status.className = "todo";

                    status.textContent =
                        "Запланировано";

                }

            }


            updateProgress();

        }
    );

});


/* ======================================
   6. ПРОГРЕСС
====================================== */

function updateProgress() {

    const allTasks =
        document.querySelectorAll(".task");

    const completedTasks =
        document.querySelectorAll(".task.completed");


    if (!allTasks.length) {
        return;
    }


    const total =
        allTasks.length;

    const completed =
        completedTasks.length;

    const percent =
        Math.round(
            completed / total * 100
        );


    const title =
        document.querySelector(
            ".planner-progress h2"
        );

    const number =
        document.querySelector(
            ".planner-progress .percent"
        );

    const bar =
        document.querySelector(
            ".planner-progress .progress div"
        );


    if (title) {

        title.textContent =
            completed +
            " из " +
            total +
            " задач выполнено";

    }


    if (number) {

        number.textContent =
            percent + "%";

    }


    if (bar) {

        bar.style.width =
            percent + "%";

    }

}


updateProgress();


/* ======================================
   7. АНИМАЦИЯ НАЖАТИЯ
====================================== */

const buttons =
    document.querySelectorAll(
        "button, .btn"
    );


buttons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            button.classList.add(
                "button-click"
            );


            setTimeout(function() {

                button.classList.remove(
                    "button-click"
                );

            }, 200);

        }
    );

});


/* ======================================
   8. ПЛАВНЫЙ ПЕРЕХОД
====================================== */

const pageLinks =
    document.querySelectorAll(
        'a[href$=".html"]'
    );


pageLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            const href =
                link.getAttribute("href");


            if (
                href &&
                !href.startsWith("#")
            ) {

                event.preventDefault();


                document.body.style.opacity =
                    "0";


                setTimeout(function() {

                    window.location.href =
                        href;

                }, 250);

            }

        }
    );

});