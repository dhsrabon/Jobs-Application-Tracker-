document.addEventListener("DOMContentLoaded", () => {

    const totalCount = document.getElementById("total-count");
    const interviewCount = document.getElementById("interview-count");
    const rejectedCount = document.getElementById("rejected-count");
    const jobsInfo = document.getElementById("jobs-info");

    const filterAll = document.getElementById("filter-all");
    const filterInterview = document.getElementById("filter-interview");
    const filterRejected = document.getElementById("filter-rejected");

    const emptyState = document.getElementById("empty-state");
    const emptyTitle = document.getElementById("empty-title");
    const emptySubtitle = document.getElementById("empty-subtitle");

    let currentFilter = "all";

    
    function updateCounts() {

        const cards = document.querySelectorAll(".job-card");
        const total = cards.length;

        const interview = document.querySelectorAll('[data-status="interview"]').length;
        const rejected = document.querySelectorAll('[data-status="rejected"]').length;

        totalCount.textContent = total;
        interviewCount.textContent = interview;
        rejectedCount.textContent = rejected;

        const visible = [...cards].filter(card => card.style.display !== "none").length;

        jobsInfo.textContent =
            currentFilter === "all"
                ? `${total} jobs`
                : `${visible} of ${total} jobs`;

        
        if (visible === 0) {
            emptyState.classList.remove("hidden");

            if (currentFilter === "interview") {
                emptyTitle.textContent = "No interview jobs";
                emptySubtitle.textContent = "You haven't marked any job for interview.";
            }
            else if (currentFilter === "rejected") {
                emptyTitle.textContent = "No rejected jobs";
                emptySubtitle.textContent = "You haven't rejected any job yet.";
            }
            else {
                emptyTitle.textContent = "No jobs available";
                emptySubtitle.textContent = "Try switching tabs or add new jobs.";
            }

        } else {
            emptyState.classList.add("hidden");
        }
    }

   
    function applyFilter(type) {

        currentFilter = type;

        document.querySelectorAll(".job-card").forEach(card => {

            if (type === "all") {
                card.style.display = "block";
            } else {
                card.style.display =
                    card.dataset.status === type ? "block" : "none";
            }

        });

        updateCounts();
    }

    function attachEvents(card) {

        const interviewBtn = card.querySelector(".interview-btn");
        const rejectBtn = card.querySelector(".reject-btn");
        const deleteBtn = card.querySelector(".delete-btn");
        const badge = card.querySelector(".status-badge");

        
        interviewBtn.addEventListener("click", () => {

            card.dataset.status = "interview";
            badge.textContent = "INTERVIEW";
            badge.className =
                "status-badge mt-3 inline-block px-3 py-1 text-xs bg-green-100 text-green-700 rounded";

            updateCounts();   
        });

        
        rejectBtn.addEventListener("click", () => {

            card.dataset.status = "rejected";
            badge.textContent = "REJECTED";
            badge.className =
                "status-badge mt-3 inline-block px-3 py-1 text-xs bg-red-100 text-red-700 rounded";

            updateCounts();   
        });

        
        deleteBtn.addEventListener("click", () => {
            card.remove();
            updateCounts();
        });
    }

    
    document.querySelectorAll(".job-card").forEach(card => {
        attachEvents(card);
    });

    
    filterAll.addEventListener("click", () => applyFilter("all"));
    filterInterview.addEventListener("click", () => applyFilter("interview"));
    filterRejected.addEventListener("click", () => applyFilter("rejected"));

    
    updateCounts();
});