// Interface 
interface ICalculadoraIMC {
  calcularIMC(peso: number, altura: number): number;
}

// Implementa a interface
class CalculadoraIMC implements ICalculadoraIMC {
  calcularIMC(peso: number, altura: number): number {
    return peso / (altura * altura);
  }
}



