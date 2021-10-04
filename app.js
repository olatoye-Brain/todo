//developin todos list
//usin functions

class Todo{
    constructor(){

    }

    errorTodo(feeback){
        let feed = 'Field must not be empty';
        feeback.classList.add('show','error' );
        feeback.innerHTML = feed;
        setTimeout(()=>{
            feeback.classList.remove('show','error' );
        }, 2000)
    }

    successTodo(todo, feeback){
        let feed = `${todo} successfully entered`;
        feeback.classList.add('show','success' );
        feeback.innerHTML = feed;
        setTimeout(()=>{
            feeback.classList.remove('show','success' );
        }, 2000);
    }

    cleared(clear, msg, display){
        clear.classList.add('show', display );
        clear.classList.remove('done');
        clear.innerHTML = msg;
        setTimeout(()=>{
            clear.classList.remove('show','error' );
        }, 2000)
    }

    createTodo(todo){
        let li =  document.createElement('li');
        let list =  document.querySelector(".todolisted");
        let holder = document.querySelector('.placeholder');
        li.innerHTML = `
                <span>${todo}</span>
                <div id='edit' class="edit" data-complete='complete'>&#x2611;</div> 
                <div id='delete' class="delete" data-delete='delete'>&#x274C;</div>
                <div class="clear"></div>
            `;
            list.appendChild(li);    
        holder.innerHTML = '';
    }

    clear(element){
        element.value = '';
    }

}

let form = document.querySelector('#form');
let todolisted = document.querySelector('.todolisted');

form.addEventListener('submit', submitTodos);

todolisted.addEventListener('click', completeTodos);

function submitTodos(e){
    e.preventDefault();
    let todo = new Todo();
    let todosInput =  document.querySelector('#todos');
    let feeback =  document.querySelector("#feedback");

    if(todosInput.value === ''){
        todo.errorTodo(feeback);
    }else{
        todo.successTodo(todosInput.value, feeback);
 
        // console.log(todosInput.value);
        //Remove place
       
       let listTodo;
       listTodo = localStorage.getItem('listTodo')? JSON.parse(localStorage.getItem('listTodo')) : [];

       listTodo.push(todosInput.value);
       localStorage.setItem('listTodo', JSON.stringify(listTodo));

       todo.createTodo(todosInput.value); 
       todo.clear(todosInput);

    }
}

// function createTodo(todo){
//     let li =  document.createElement('li');
//     let list =  document.querySelector(".todolisted");
//     let holder = document.querySelector('.placeholder');


//     li.innerHTML = `
//             <span>${todo}</span>
//             <div id='edit' class="edit" data-complete='complete'>&#x2611;</div> 
//             <div id='delete' class="delete" data-delete='delete'>&#x274C;</div>
//             <div class="clear"></div>
//         `;
//         list.appendChild(li);
//         todo = '';

//     holder.innerHTML = '';
// }



function completeTodos(e){
    let todolisted = document.querySelector('.todolisted');
    let todoClass = new Todo();
    let clearMsg = document.querySelector('#clearMsg');


    e.preventDefault();
    console.log(e.target);
    console.log(e.target.classList);
    e.target.classList.contains('complete')? e.target.classList.remove('complete') : e.target.classList.add('complete');
    e.target.parentElement.firstElementChild.classList.contains('done')? e.target.parentElement.firstElementChild.classList.remove('done'): e.target.parentElement.firstElementChild.classList.add('done');
    
    if(e.target.dataset.delete){
        todolisted.removeChild(e.target.parentElement);
        let text = e.target.parentElement.firstElementChild.innerHTML;
        //flash message of deleted todos
        todoClass.cleared(clearMsg, `<b>${text}</b> is successfully deleted`, 'success');
        //remove from local storage
        let todoItems = JSON.parse(localStorage.getItem('listTodo'));

        let index = todoItems.indexOf(text);
        todoItems.splice(index, 1);
        console.log(todoItems);
        
        localStorage.removeItem('listTodo');
        //resetin it back
        localStorage.setItem('listTodo', JSON.stringify(todoItems));
        

        if(todolisted.childElementCount === 2){
            let placeholder = document.querySelector('.placeholder');
            console.log('No! Todos Entries!');
            placeholder.innerHTML = 'No Todos Entries!';
            placeholder.classList.remove('done');
        }
    }

    if (e.target.classList.contains('placeholder')){
        
        e.target.classList.remove('done', 'complete');
        
    }

}

document.addEventListener('DOMContentLoaded', ()=>{
    let todolisted = document.querySelector('.todolisted');

    if(todolisted.childElementCount === 2){
        let placeholder = document.querySelector('.placeholder');
        console.log('No! Todos Entries!');
        placeholder.classList.add('show');
        placeholder.innerHTML = 'No Todos Entries!';
    }

   

    let exist = localStorage.getItem('listTodo');

    let todoClass = new Todo();
    if(exist){
        let postedTodos = JSON.parse(localStorage.getItem('listTodo'));

        postedTodos.forEach((todo, index)=>{
            todoClass.createTodo(todo);
            // console.log(`Todo list: ${todo}`)   
            console.log(`Todo list:${index + 1} is ${todo}`) 
        })
        console.log(postedTodos);
    }

    // localStorage.clear()
});

let clearAll = document.querySelector('#clear');

clearAll.addEventListener('click', ()=>{
    let todolisted = document.querySelector('.todolisted'); 
    let clearMsg = document.querySelector('#clearMsg');
    let placeholder = document.querySelector('.placeholder');
    let todoClass = new Todo();
    //removin from localstore
    localStorage.removeItem('listTodo');
    let items = document.querySelectorAll('li');
    console.log(items.length);

    // todolisted.innerHTML = '';
    // let span = document.createElement('span');
    // span.className = 'placeholder';
    // span.innerHTML = 'No Todos Entries!';
    // // todoClass.cleared(span, 'All items deleted', 'error')
    // todolisted.appendChild(span);

    if(items.length > 0){
        todoClass.cleared(clearMsg, 'All items deleted', 'error');
        items.forEach(item =>{
            todolisted.removeChild(item);
            placeholder.classList.add('show');
            placeholder.innerHTML = 'No Todos Entries!';
        })
    }else{
        todoClass.cleared(clearMsg, 'No more items to delete', 'success');
        placeholder.classList.add('show');
        placeholder.innerHTML = 'No Todos Entries!';
    }

    // localStorage.clear();
    
});








//Submit todos function



