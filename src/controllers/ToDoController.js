class ToDoController{


    /**
    @param {string} formId form which contains the items from to-do
    */
    constructor(formId){

        this.formItems = document.getElementById(formId);
        this.items = document.querySelectorAll('.items');
        this._currentInputActive;

        this.updateItemList();
        this.setIdToItems(this.items)
        this.initEvents();
    }


    /**
    *Adds id to items in div "items"
    */
    setIdToItems(){
    
        this.items.forEach((element,index) =>{

            if(element.classList.contains('items')) element.id = 'items'+index
                
            element.querySelector('.item-complete-status').id = `item-complete-status${index}`;
            element.querySelector('.item-to-do').id = 'item-to-do'+index
        })
                
    }

    addToDoItemLine(){        
        let itemAdd = document.createElement('div');
        itemAdd.innerHTML = `
            <input class='item-complete-status' type="checkbox">
            <input class='item-to-do' type="text">                       
            `

        itemAdd.classList.add('items');
        itemAdd.classList.add('slide-bottom')
        this.formItems.appendChild(itemAdd);        
        
        let inputToDo = itemAdd.querySelector('.item-to-do')
        inputToDo.focus()
        inputToDo.click();



        this.updateItemList();
        this.setIdToItems();
        this.addEventsToItems(itemAdd);
        
        this._currentInputActive = inputToDo.id
        
        }

    getInputTodoId(idInputFull){
        //returns last char from input to get id number
        return idInputFull.id.charAt(idInputFull.id.length -1);
    }
    removeCurrentLine(itemLine){
        if(this.items.length > 1){

        itemLine.classList.add('slide-top')
        setTimeout(() => {
            let inputToDo = itemLine.querySelector('.item-to-do');
        
            this._currentInputActive = inputToDo.id;

            let idInputToDo = this.getInputTodoId(inputToDo);
            let upperItem = 'items'+(parseInt(idInputToDo)-1)

            if(idInputToDo == 0 || idInputToDo < 0){            
                upperItem = 'items0';
            }
            upperItem = document.getElementById(upperItem);
            inputToDo = upperItem.querySelector('.item-to-do');
            inputToDo.focus()
            
            

            itemLine.remove();
            this.updateItemList();
            this.setIdToItems();
        }, 500);
        
        }
                
    }

    addEventsToItems(item){


        let inputText = item.querySelector('.item-to-do');
        inputText.addEventListener('keypress', e=>{
            
            if(e.key === 'Enter' && inputText.value != ""){
                                
                let idInputText = this.getInputTodoId(inputText)
                
                if(this.items.length == parseInt(idInputText) + 1){
                    
                    this.addToDoItemLine()
                    
                }                                
            }
        })
        inputText.addEventListener('keydown', e=>{
            
            if(e.key == 'Backspace'){
                if(inputText.value == "" || inputText.value == undefined){
                    this.removeCurrentLine(item);
                }
            }
        })
        inputText.addEventListener('focus', e=>{
            
            this._currentInputActive = inputText.id
        })
        inputText.addEventListener('click', e=>{
            
            this._currentInputActive = inputText.id
        })
        

        let inputCheck = item.querySelector('.item-complete-status');
        inputCheck.addEventListener('click', e=>{
            
            console.log('CHECKED VALUE:', inputCheck.checked)
            if(inputCheck.checked){
                console.log('TRUE KKKKK');
                inputText.disabled = true;
            }
            else if(!inputCheck.check){
                console.log('FALSEKKKKKKK')
                inputText.disabled = false;
            }
        })
    }

    updateItemList(){
        this.items = document.querySelectorAll('.items');
    }
    initEvents(){
        this.formItems.addEventListener('submit', e=>{
            e.preventDefault();
        });

        [...this.items].forEach((item)=>{
                        
            this.addEventsToItems(item);

        })


    }

    get currentInputActive(){
        return this._currentInputActive;
    }

}