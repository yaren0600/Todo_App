let todoItems = [];

const todoStorage = localStorage.getItem("todoItems");

const todoListEl = document.querySelector(".todo_list");

if(todoStorage){
    //Eğer todoStorage değerinde bir veri varsa 
    todoItems = [...JSON.parse(todoStorage)]; // array içerisine ekle 
};

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

};

const addTodoToHtml = (todoItem) => {
    let todoItemHtml = `<li class="todo_item ${
         todoItem.isComplete ? 'todo_item-complete' : ''}"> 
        <div class="todo_complete btn" data-id = "${todoItem.id}"
            onclick = "toggleTodoComplete(this)">
            <img  src="./img/checked.svg" />
        </div>
        <div class="todo_info">
            <span class="todo_info-title">${todoItem.title}</span>
            <span class="todo_info-desc">${todoItem.desc}</span>
        </div>
        <img class="todo_delete-icon btn" src="./img/delete.svg" 
        data-id="${todoItem.id}" onclick = "removeTodoItem(this)"/>
    </li>`;

    todoListEl.insertAdjacentHTML("beforeend", todoItemHtml);
};

const saveTodoItemsToLS = () => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

//Başlık ve açıklaması girilen ve kaydedilen işin arraye aktarılması ve ekranda gösterilmesi gerekiyor.
const addTodoItems = () => {
    if(todoListEl.innerHTML != "") todoListEl.innerHTML = "";
    const title = document.querySelector("input[name = 'title']").value;
    const desc = document.querySelector("textarea[name = 'desc']").value;

    const addedTodoItem = {
        id : uniqueIdGenerator(), 
        title, 
        desc, 
        isComplete: false, 
    };
    document.querySelector("#addTodoForm").reset();
    addTodoToHtml(addedTodoItem);
    todoItems.push (addedTodoItem);
    saveTodoItemsToLS();

    toggleModal(); //İş kaydedildikten sonra formu kapatıyoruz

};

const toggleTodoComplete = (selectedEl) => {
    const toggleItemIndex = todoItems.findIndex(todo => todo.id == selectedEl.dataset.id);

    if(toggleItemIndex != -1){
        todoItems[toggleItemIndex].isComplete = !todoItems[toggleItemIndex].isComplete;
        selectedEl.parentNode.classList.toggle("complete");
        saveTodoItemsToLS();
    }
    
};

const removeTodoItem = (removedEl) => {
    const removedItemIndex = todoItems.findIndex(todo => todo.id == removedEl.dataset.id);

    if(removedItemIndex != -1){
        todoItems.splice(removedItemIndex, 1); //id'si removedItemIndex değeri olan değerden itibaren 1 veriyi siliyoruz.
        removedEl.parentNode.remove();
        saveTodoItemsToLS(); //Sayfayı yenilediğimiz zaman yapılan değişikliklerin unutulmamasını sağlar.
        if(todoItems.length == 0){
            const notFoundItem = `<li class="none-todos"> Henüz Yapılacak Bir İş Eklenmedi...</li>`
            todoListEl.insertAdjacentHTML("beforeend", notFoundItem);
        }
    }
}

const listTodoItems = () => {
    if(todoItems.length <= 0 ){
        const notFoundItem = `<li class="none-todos"> Henüz Yapılacak Bir İş Eklenmedi...</li>`
        todoListEl.insertAdjacentHTML("beforeend", notFoundItem);
    }
    else{
        todoItems.forEach(todo => { //todoItems değişkenlerinin tümünü dönerek todo değişkenine atıyoruz
        addTodoToHtml(todo); //todo değişkenlerinin HTML kısmında gösteriyoruz
    });
    }


}
listTodoItems();



