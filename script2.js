<script>
const sections = document.querySelectorAll("section");

function reveal(){
    sections.forEach(sec=>{
        const rect = sec.getBoundingClientRect();
        if(rect.top < window.innerHeight - 100){
            sec.classList.add("show");
        }
    });
}

window.addEventListener("scroll",reveal);
window.addEventListener("load",reveal);
</script>
