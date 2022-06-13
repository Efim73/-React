const root = ReactDOM.createRoot(document.getElementById('root'));
// создается компонент App
class App extends React.Component {
    constructor(props) {
        super(props);
        // состояние компонента
        this.state = {
            // текст внутри инпута
            text: '',
            // пункты списка
            items:[
            ],
        }
    }
    // функция для добавления нового пункта. 
    handleSubmit(e){
        e.preventDefault();
        // будущий пункт списка
        let newItem = {
            text: this.state.text,
            id: Date.now(),
        }
        // задается новое состояние 
        this.setState(function(state){
            // держит текущие кол-во пунктов 
            let newItems = state.items;
            // В текущее кол-во пунктов добавляется новый пункт
            newItems.push(newItem)
            // в состояние задается новое кол-во пунктов
            return{
                items: newItems,

            }
        },
        // данная функция вызывается после обновления состояния
        function(){
            console.log(this.state);
        })
    }
    // создает form 
    render() {
    
        return (
            // onSubmit срабатывает если подтвердить форму
            <form action="" onSubmit={(e)=> this.handleSubmit(e)}>
                <h1>Список из {this.state.items.length} дел</h1>
                <ol>
                    {
                        this.state.items.map((item, i)=>
                        <li key={item.id}>
                            <p>{item.text}</p>
                            <button className='cross' type='button'>X{i}</button>
                        </li>
                        )
                    }
                </ol>
                {/* onChange срабатывает при изменении input */}
                <input type="text" placeholder='Новое дело' onChange={(e)=> this.setState({text:e.target.value})} />
                <button className='add' >Добавить {this.state.text}</button>
            </form>
        )
    }
}
root.render(<App />)