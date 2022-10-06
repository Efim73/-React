const root = ReactDOM.createRoot(document.getElementById('root'));
// создается компонент App
let firstText='';
class App extends React.Component {
    constructor(props) {
        super(props);
        // состояние компонента
        this.state = {
            activeTab: 0,
            yellowTab: 0,


            

            // текст внутри инпута
            text: '',
            // пункты списка
            items: [
                {
                    text: 'погулять',
                    id: Date.now(),

                },
                {
                    text: "приготовить обед",
                    id: 12,
                }
            ],
            tabs: [
                'All',
            ],
            modalClassList: 'modal',
            editedText: '',
            itemId: null,
        }
    }
    //    ?
    delete(i) {


        console.log(i);
        this.setState(function (state) {
            let newItems = state.items
            newItems.splice(i, 1)
            return {
                items: newItems
            }


        })
    }

    textChange(e){
        if(e.target.classList.contains('textColor')){
            e.target.classList.remove('textColor')
        }
        else{
            e.target.classList.add('textColor')
        }
    }

    handleCheck(e) {
        // if (e.target.classList.contains('checkItem')){
        //     e.target.classList.remove('checkItem')

        // }
        // else {

        //     e.target.classList.add('checkItem')
        // }
        console.log(555);

        // firstText = e.target.item.text;
        // this.state.items[0].text = e.target.item.text;
        // this.state.items[0].text = firstText;
        this.setState(function(state){
            let newItems = state.items
            newItems[0].text = e.target.innerHTML;
            return{
                items: newItems

            }
        })

    }
    removeLists(e) {
        // this.setState=[];
        this.setState(function (state) {
            return {
                items: []
            }


        })
    }
    handleEdit(i, text){
        this.setState({
            modalClassList: 'modal modalShow',
            editedText: text,
            itemId: i,

        })
    }

    editText(i ){
        // let newElement = this.state.items[i];
        // newElement.text = this.state.editedText;
        this.setState(function(state){
            let newItems = state.items;
            newItems[i].text = this.state.editedText;
            return{
                items: newItems,
                modalClassList: 'modal',
            }
        })
    }

    handleNewTab(){
        console.log(123);
        this.setState(function(state){
              let newTabs = state.tabs;
            newTabs.push('Tab '+this.state.tabs.length)
            return {
                tabs : newTabs,
            }
        })
    }
     
    // функция для добавления нового пункта. 
    handleSubmit(e) {
        e.preventDefault();
        // будущий пункт списка
        let newItem = {
            text: this.state.text,
            id: Date.now(),
        }
        // задается новое состояние 
        this.setState(function (state) {
            // держит текущие кол-во пунктов 
            let newItems = state.items;
            // В текущее кол-во пунктов добавляется новый пункт
            newItems.push(newItem)
            // в состояние задается новое кол-во пунктов
            return {
                items: newItems,

            }
        },
            // данная функция вызывается после обновления состояния
            function () {
                console.log(this.state);
            })
    }
    // создает form 
    render() {

        return (
            <div>
                <div className={this.state.modalClassList}>
                <form className="container">
                    <h2>Редактировать дело</h2>
                    <input type="text" className="editInput" value={this.state.editedText} onChange={(e)=> this.setState({editedText: e.target.value})} />
                    <button type='button' className='change' onClick={() => this.editText(this.state.itemId)}>Подтвердить</button>
                </form>
                </div>
            {/* // onSubmit срабатывает если подтвердить форму */}
                <form action="" onSubmit={(e) => this.handleSubmit(e)}>
                    <h1 onClick={(e) => this.textChange(e)}>Список из {this.state.items.length} дел</h1>
                    <button type='button' className='button' onClick={()=>this.handleNewTab()}>+Tab</button>
                    <ul>
                        {
                            this.state.tabs.map((tab, id)=>(
                                <Tab yellowTab={this.state.yellowTab} activeTab={this.state.activeTab} id={id} text={tab}/>
                            ))
                        }
                    </ul>
                    <ol>
                        {
                            this.state.items.map((item, i) =>(
                                <li key={item.id} >
                                    <p onClick={(e) => this.handleCheck(e)}>{item.text}</p>
                                    <button type='button' className='cross' onClick={() => this.handleEdit(i, item.text)} >🖊️</button>
                                    <button onClick={() => this.delete(i)} className='cross' type='button'>🗑️</button>
                                </li>
                            ))
                        }

                    </ol>
                    {/* onChange срабатывает при изменении input */}
                    <input type="text" placeholder='Новое дело' onChange={(e) => this.setState({ text: e.target.value })} value={this.state.text}/>
                    <button className='add'  disabled={this.state.text.length>20? true : false}>+</button >
                    <button type='button' className='removeAll' onClick={(e) => this.removeLists(e)}>Удалить все пункты</button>
                </form>
            </div>
        )
    }
}


class Tab extends React.Component{
    constructor(props){

        super(props)
        this.state={

        }
    }
    render(){
        return(

            <li className=  {'tab '+(this.props.id==this.props.activeTab? 'activeTab ':'' )+(this.props.id==this.props.yellowTab? 'yellowTab': '')}>{this.props.text}</li>
        )
        
    }
}

root.render(<App />)




// при нажатии на дело текст из данного пункта переносится в первый пункт.