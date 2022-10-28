import {Formik , Form , Field} from "formik"
import * as Yup from "yup"
import {useDispatch} from "react-redux";
import {createHero} from "../../actions";
import { v4 as uuidv4 } from 'uuid';
import {useEffect} from "react";
import {useHttp} from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch()
    const {request} = useHttp()

    const getHeroData = (hero) => {
        request("http://localhost:3001/heroes" , "POST" , JSON.stringify(hero))
            .then(res => dispatch(createHero(res)))
            .catch(res => console.log(res))
    }

    return (
        <Formik initialValues={{
            id: uuidv4(),
            name: "",
            description: "",
            element: ""
        }}
        validationSchema={
            Yup.object({
                name: Yup.string().min(3 , "Минимальное колчиество символов 3").required("Это поле обязательное"),
                description: Yup.string().required("Это поле обязательное"),
                element: Yup.string().required("Вам нужно выбрать значение из списка")
            })
        }
        onSubmit={(values , {resetForm}) => {
            getHeroData(values)
            resetForm()
        }}
        >
            {({errors}) => (
                <Form className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    />
                        <p style={{color: "FF0000"}}>{errors.name}</p>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                    as="textarea"
                    required
                    name="description"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    />
                        <p style={{color: "FF0000"}}>{errors.text}</p>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                    as="select"
                    required
                    className="form-select"
                    id="element"
                    name="element">
                    {/*<option >Я владею элементом...</option>*/}
                    {/*<option value="fire">Огонь</option>*/}
                    {/*<option value="water">Вода</option>*/}
                    {/*<option value="wind">Ветер</option>*/}
                    {/*<option value="earth">Земля</option>*/}
                    </Field>
                        <p style={{color: "FF0000"}}>{errors.element}</p>
                    </div>

                    <button type="submit" className="btn btn-primary">Создать</button>
                </Form>
            )}
        </Formik>
    )
}

export default HeroesAddForm;