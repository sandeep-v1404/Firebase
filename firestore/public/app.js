const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
//create elem and render
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    cross.textContent = 'x';
    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);
    //Deleting Data
    cross.addEventListener("click", function(e) {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("cafes").doc(id).delete();
    })
}
// db.collection("cafes").where("city", '==', "Hyderabad").get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })


// db.collection("cafes").orderBy("name").get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })


// db.collection("cafes").where("city", "==", "Hyderabad").orderBy("name").get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })


form.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = "";
    form.city.value = "";
})

db.collection("cafes").orderBy("city").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderCafe(change.doc);
            } else if (change.type = "removed") {
                let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
                cafeList.removeChild(li);
            }
        })
    })
    //Updating 
    // db.collection("cafes").where("name", "==", "Hyderabad").update({ name: "Sandeep" });