import {useDispatch , useSelector} from "react-redux";
import {useEffect} from "react";
import {useHttp} from "../../hooks/http.hook";
import {fetchFilters , activeFilter} from "../../actions";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {filters , filterActive} = useSelector(state => state.filters)

    useEffect(() => {
        dispatch(fetchFilters(request))
    } , [])

    const renderButtons = () => {
        return filters.map(({ name , label , className}) => {
            const activeClass = filterActive === name ? "active" : ""
            return <button
                        key={name}
                        className={className + " " + activeClass}
                        onClick={() => dispatch(activeFilter(name))}>
                        {label}
                    </button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/*<button className="btn btn-outline-dark active">Все</button>*/}
                    {/*<button className="btn btn-danger">Огонь</button>*/}
                    {/*<button className="btn btn-primary">Вода</button>*/}
                    {/*<button className="btn btn-success">Ветер</button>*/}
                    {/*<button className="btn btn-secondary">Земля</button>*/}
                    {renderButtons()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;