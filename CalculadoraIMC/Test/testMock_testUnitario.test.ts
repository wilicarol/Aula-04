import { CalculadoraIMC } from './CalculadoraIMC'// Jest mock para a interface ICalculadoraIMC
  
  // Teste unitário para a função usarCalculadoraIMC
  describe('usarCalculadoraIMC', () => {
    it('deve calcular o IMC corretamente', () => {
      const calcMock = new CalculadoraIMC();
      expect(calcMock.calcularIMC(70, 1.75)).toBe(22.86);
    });
  });
  