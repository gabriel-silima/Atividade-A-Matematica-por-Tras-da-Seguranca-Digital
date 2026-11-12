"""Testes sem dependências externas: python -m unittest discover -s tests -v"""
import unittest
from CriptoPrimos import crivo_eratostenes, indice_para_primo, fatorar, executar


class LaboratorioTestes(unittest.TestCase):
    def test_crivo_ate_100(self):
        mapa = crivo_eratostenes(100)
        self.assertEqual(mapa.count(1), 25)
        self.assertEqual([i for i, p in enumerate(mapa) if p][:8],
                         [2, 3, 5, 7, 11, 13, 17, 19])

    def test_indices(self):
        mapa = crivo_eratostenes(100)
        self.assertEqual(indice_para_primo(mapa, 4), 11)
        self.assertEqual(indice_para_primo(mapa, 7), 19)
        with self.assertRaises(IndexError):
            indice_para_primo(mapa, -1)
        with self.assertRaises(IndexError):
            indice_para_primo(mapa, 25)

    def test_fatoracao(self):
        self.assertEqual(fatorar(209), [11, 19])
        self.assertEqual(fatorar(49), [7, 7])
        self.assertEqual(fatorar(101), [101])

    def test_execucao(self):
        import contextlib
        import io
        with contextlib.redirect_stdout(io.StringIO()):
            resultado = executar(100, 4, 7)
        self.assertEqual(resultado["n"], 209)
        self.assertEqual(resultado["fatores"], [11, 19])


if __name__ == "__main__":
    unittest.main()
