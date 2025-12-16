let todoItems = [];

const todoModalEl = document.querySelector(".todo_modal");


const toggleModal = () => {
    todoModalEl.classList.toggle("show"); //yani todo_modal classı show ise formu göster değilse formu gizle

};

//Eğer form dışında bir alana tıklandıysa yani background kısmına tıklandıysa formun kapanması gerekiyor.
todoModalEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("todo_modal")) toggleModal();
});

//Yeni oluşturulan her iş için benzersiz bir id oluşturulmalı. Böylece belirli bir iş eklenebilir ve ya listeden silinebilir.
const uniqueIdGenerator = () => {
    return Math.round (Math.random() * 100000 + 1 ) ; //Math.random metodu normalde 0 ve 1 arasında sayı üretiyordu. Bu işlemle biz 1 ve 100000 arasında sayı üretilmesini sağladık.
    //Math.round metodu ise sayıyı integera dönüştürür.

}

const addTodoToHtml = (todoItem) => {
    const todoListEl = document.querySelector(".todo_list");
    let todoItemHtml = `<li class="todo_item ${ todoItem.isComplete ? 'todo_item-complete' : ''}"> 
        <div class="todo_complete btn">
            <img src="./img/checked.svg"/>
        </div>
        <div class="todo_info">
            <span class="todo_info-title">${todoItem.title}</span>
            <span class="todo_info-desc">${todoItem.desc}</span>
        </div>
        <img class="todo_delete-icon btn" src="./img/delete.svg"/>
    </li>`;

    todoListEl.insertAdjacentHTML("beforeend", todoItemHtml);
};

//Başlık ve açıklaması girilen ve kaydedilen işin arraye aktarılması ve ekranda gösterilmesi gerekiyor.
const addTodoItems = () => {
    const title = document.querySelector("input[name = 'title']").value;
    const desc = document.querySelector("textarea[name = 'desc']").value;

    const addedTodoItem = {
        id : uniqueIdGenerator(), 
        title, 
        desc, 
        isComplete: false
    };
    addTodoToHtml(addTodoItems);
    todoItems.push (addedTodoItem);

    toggleModal(); //İş kaydedildikten sonra formu kapatıyoruz

};

