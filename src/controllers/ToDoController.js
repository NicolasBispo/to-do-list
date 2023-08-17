class ToDoController{

    constructor(form){

        this.formItems = document.getElementById(form);
        this.items = document.querySelectorAll('.items');
        this._currentInputActive;

        this.updateItemList();
        this.setIdToItems(this.items)
        this.initEvents();
    }

    setIdToItems(){
    //Set an id to each item in the form                         
        this.items.forEach((element,index) =>{
            let elementName = element.className
            
            element.id = elementName+index
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
        this.formItems.appendChild(itemAdd);
        let inputToDo = itemAdd.querySelector('.item-to-do')
        inputToDo.focus()
        inputToDo.click();



        this.updateItemList();
        this.setIdToItems();
        this.addEventsToItems(itemAdd);
        
        this._currentInputActive = inputToDo.id
        
        
    }

    addEventsToItems(item){
        let inputText = item.querySelector('.item-to-do');
        inputText.addEventListener('keypress', e=>{
            if(e.key === 'Enter' && inputText.value != ""){
                let strInputText = inputText.id
                console.log('strinputtext', strInputText)       
                let idInputText = strInputText.charAt(strInputText.length -1)

                console.log('items.length', this.items.length)
                console.log('idinputtext', idInputText)
                if(this.items.length == parseInt(idInputText) + 1){
                    
                    this.addToDoItemLine()
                    
                }                
                
            }
        })
        inputText.addEventListener('keydown', e=>{
            if(e.key == 'Backspace'){
                if(inputText.value == "" || inputText.value == undefined){
                    removeCurrentLine();
                }
            }
        })
        inputText.addEventListener('focus', e=>{
            console.log('elemento focus')
            this._currentInputActive = inputText.id
        })
        inputText.addEventListener('click', e=>{
            console.log('elemento click');
            this._currentInputActive = inputText.id
        })
        
    }

    updateItemList(){
        this.items = document.querySelectorAll('.items');
    }
    initEvents(){
        [...this.items].forEach((item)=>{
                        
            this.addEventsToItems(item);

        })
    }

    get currentInputActive(){
        return this._currentInputActive;
    }

}