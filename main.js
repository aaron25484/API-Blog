const postsUrl = "http://localhost:3000/posts";
const usersUrl = "http://localhost:3000/users";
const commentsUrl = "http://localhost:3000/comments";


let mainBody = document.querySelector(".container.mt-3");

let theRow = document.querySelector("#roW");



window.addEventListener('load', () => {
    fetch(postsUrl)
        .then(response => response.json())
        .then(data => {
            
            data.forEach(post => {

                let divCol = document.createElement("div");
                divCol.className = "col-md-3 col-sm-6";
                let divCard = document.createElement("div");
                divCard.className = "card card-block";
                let divImg = document.createElement("img");
                divImg.src = "assets/Pink-Floyd13.jpg"
                let divTitle = document.createElement("h5");
                divTitle.className = "card-title mt-3 mb-3";
                divTitle.textContent = post.title;
                

                theRow.appendChild(divCol);
                divCol.appendChild(divCard);
                divCard.appendChild(divImg);
                divCard.appendChild(divTitle);

                divCard.addEventListener('click', ()=>{
                    textBodyPost(post);
                })
            });
        });
});

function textBodyPost(post){
    const myModal = new bootstrap.Modal(exampleModal);
    myModal.show();   
    let modalTitle = document.querySelector("#exampleModalLabel")
    modalTitle.textContent = post.title;
    let modalBody = document.querySelector("#vamo");
    modalBody.textContent = post.body;  
    
        fetch(usersUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(user =>{

                    if(post.userId == user.id){
                    let userPostName = document.querySelector("#userName");
                    userPostName.textContent = user.username;
                    let userPostEmail = document.querySelector("#userEmail");
                    userPostEmail.textContent = user.email;
                    }
                })
            })
            
    let buttonComment = document.querySelector("#commentLoader");

    buttonComment.addEventListener('click', ()=>{
        fetch(commentsUrl)
            .then(response => response.json())
            .then(data =>{
                data.forEach(comment =>{
                    if(post.id == comment.postId){
                        console.log(data)
                        let bodyModalContain = document.querySelector(".modal-content")
                        let divComment = document.createElement("div");
                        bodyModalContain.appendChild(divComment);
                        let commentName = document.createElement("h6");
                        divComment.appendChild(commentName);
                        commentName.textContent = comment.name;
                        let commentBody = document.createElement("p");
                        divComment.appendChild(commentBody);
                        commentBody.textContent = comment.body;
                        let commentMail =document.createElement("p");
                        divComment.appendChild(commentMail);
                        commentMail.textContent = comment.email;
                    }
                })
            })
    })
            
}
