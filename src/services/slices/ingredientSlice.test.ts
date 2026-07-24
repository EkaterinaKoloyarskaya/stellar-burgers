import { expect, test, describe } from '@jest/globals';
import { ingredientSlice, initialState, getIngredients } from '../slices/ingredientsSlice';

describe('[ingredientSlice] тест массива ингредиентов', () => {
    test('возвращает initialState для неизвестного экшена', () => {
        const state = ingredientSlice.reducer(undefined, {type: 'UNKNOWN'});
        expect(state).toEqual(initialState);
    });

 
    test('обрабатывает pending: устанавливает isLoading в true', () => {
        const stateBefore = {
            ingredients: [],
            isLoading: false,
            error: 'загрузка',
        }
    
        const expectedStatePending = {
            ingredients: [],
            isLoading: true,
            error: null,
        }
        const state = ingredientSlice.reducer(stateBefore, {type: getIngredients.pending.type});
        expect(state).toEqual(expectedStatePending)
    });

    test('обрабатывает rejected: записывает текст ошибки', () => {
        const stateBefore = {
            ingredients: [],
            isLoading: false,
            error: null,
        }
    
        const expectedStateReject = {
            ingredients: [],
            isLoading: false,
            error: 'отклонено',
        }
        const state = ingredientSlice.reducer(stateBefore, {type: getIngredients.rejected.type, error: {message: 'отклонено'}});
        expect(state).toEqual(expectedStateReject)
    });

    test('обрабатывает fulfilled: сохраняет полученные ингредиенты', () => {
        const stateBefore = {
            ingredients: [],
            isLoading: true,
            error: null,
        }
    
        const testIngredients = [{
            _id: '123',
            name: 'картошка',
            type: 'начинка',
            proteins: 13,
            fat: 311,
            carbohydrates: 12,
            calories: 12,
            price: 150,
            image: 'n123',
            image_large: '12e',
            image_mobile: '22ee',
        }];

        const expectedStateFulfilled = {
            ingredients: testIngredients,
            isLoading: false,
            error: null,
        }
        const state = ingredientSlice.reducer(stateBefore, {type: getIngredients.fulfilled.type, payload: testIngredients});
        expect(state).toEqual(expectedStateFulfilled);
    })
});
