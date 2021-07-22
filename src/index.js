module.exports = function solveSudoku(matrix) {
    const size = matrix.length;
    const boxSize = Math.sqrt(size);
    const findEmpty = (matrix) => {
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (matrix[r][c] === 0) {
                    return [r, c];
                }
            }
        }
        return null;
    };

    const isValid = (num, pos, matrix) => {
        const [r, c] = pos;

        for (let i = 0; i < size; i++) {
            if (matrix[i][c] === num && i !== r) {
                return false;
            }
        }

        for (let i = 0; i < size; i++) {
            if (matrix[r][i] === num && i !== c) {
                return false;
            }
        }

        const rowSegment = Math.floor(r / boxSize) * boxSize;
        const colSegment = Math.floor(c / boxSize) * boxSize;
        for (let i = rowSegment; i < rowSegment + boxSize; i++) {
            for (let j = colSegment; j < colSegment + boxSize; j++) {
                if (matrix[i][j] === num && [i, j] !== [r, c]) {
                    return false;
                }
            }
        }
        return true;
    };

    const solve = () => {
        const currPos = findEmpty(matrix);
        if (currPos === null) {
            return true;
        }
        for (let i = 1; i < size + 1; i++) {
            const validate = isValid(i, currPos, matrix);
            if (validate) {
                const [x, y] = currPos;
                matrix[x][y] = i;
                if (solve()) {
                    return true;
                }
                matrix[x][y] = 0;
            }
        }
        return false;
    };
    solve();
    return matrix;
};
