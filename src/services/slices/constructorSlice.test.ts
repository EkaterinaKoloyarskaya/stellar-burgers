import { expect, test, describe } from '@jest/globals';
import {
  addBun,
  addIngredient,
  clearConstructor,
  constructorSlice,
  initialState,
  removeIngredient
} from '../slices/constructorSlice';
import { orderBurger } from './orderSlice';

describe('[constructorSlice] тест конструктора бургера', () => {
  test('возвращает initialState для неизвестного экшена', () => {
    const state = constructorSlice.reducer(initialState, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  test('обрабатывает addIngredient: добавляет ингредиент в массив', () => {
    const stateBefore = {
      bun: null,
      ingredients: []
    };

    const testIngredients = {
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
      id: '1345'
    };

    const expectedState = {
      bun: null,
      ingredients: [testIngredients]
    };

    const state = constructorSlice.reducer(
      stateBefore,
      addIngredient(testIngredients)
    );
    expect(state).toEqual(expectedState);
  });

  test('обрабатывает removeIngredient: удаляет ингредиент по id', () => {
    const testIngredients = [
      {
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
        id: '1345'
      },
      {
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
        id: '1346'
      }
    ];

    const stateBefore = {
      bun: null,
      ingredients: testIngredients
    };

    const expectedState = {
      bun: null,
      ingredients: [testIngredients[1]]
    };

    const state = constructorSlice.reducer(
      stateBefore,
      removeIngredient('1345')
    );
    expect(state).toEqual(expectedState);
  });

  test('обрабатывает addBun: добавляет ингредиент-булку', () => {
    const testIngredients = {
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
      id: '1345'
    };

    const testBun = {
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
      image_mobile: '22ee'
    };

    const stateBefore = {
      bun: null,
      ingredients: [testIngredients]
    };

    const expectedState = {
      bun: testBun,
      ingredients: [testIngredients]
    };
    const state = constructorSlice.reducer(stateBefore, addBun(testBun));
    expect(state).toEqual(expectedState);
  });

  test('обрабатывает clearConstructor: очищает bun и ingredients', () => {
    const testIngredients = {
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
      id: '1345'
    };

    const testBun = {
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
      image_mobile: '22ee'
    };

    const stateBefore = {
      bun: testBun,
      ingredients: [testIngredients]
    };

    const expectedState = {
      bun: null,
      ingredients: []
    };

    const state = constructorSlice.reducer(stateBefore, clearConstructor());
    expect(state).toEqual(expectedState);
  });

  test('обрабатывает fulfilled: обнуляет bun и ingredients', () => {
    const testBun = {
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
      image_mobile: '22ee'
    };

    const testIngredients = {
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
      id: '1345'
    };

    const stateBefore = {
      bun: testBun,
      ingredients: [testIngredients]
    };

    const expectedState = {
      bun: null,
      ingredients: []
    };
    const state = constructorSlice.reducer(stateBefore, {
      type: orderBurger.fulfilled.type
    });
    expect(state).toEqual(expectedState);
  });
});
