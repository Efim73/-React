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
        }
    }

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
    handleCheck(e) {
        if (e.target.classList.contains('checkItem')){
            e.target.classList.remove('checkItem')

        }
        else {

            e.target.classList.add('checkItem')
        }
        console.log(e.target);

    }
    removeLists(e) {
        // this.setState=[];
        this.setState(function (state) {
            return {
                items: []
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
                <div className="modal">
                <div className="container">
                    <h2>Редактировать дело</h2>
                    <input type="text" />
                    <button className='change' onClick={(e) => this.editText(e)}>Подтвердить</button>
                </div>
                </div>
            {/* // onSubmit срабатывает если подтвердить форму */}
                <form action="" onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>Список из {this.state.items.length} дел</h1>
                    <ol>
                        {
                            this.state.items.map((item, i) =>
                                <li key={item.id}>
                                    <p onClick={(e) => this.handleCheck(e)}>{item.text}</p>
                                    <button className='cross' onClick={() => this.handleEdit()} >Edit</button>
                                    <button onClick={() => this.delete(i)} className='cross' type='button'>X{i}</button>
                                </li>
                            )
                        }

                    </ol>
                    {/* onChange срабатывает при изменении input */}
                    <input type="text" placeholder='Новое дело' onChange={(e) => this.setState({ text: e.target.value })} />
                    <button className='add'>Добавить</button>
                    <button type='button' className='removeAll' onClick={(e) => this.removeLists(e)}>Удалить все пункты</button>
                </form>
            </div>
        )
    }
}
root.render(<App />)