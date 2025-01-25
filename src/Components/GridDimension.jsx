export default function GridDimension({ gridDimensions, changeGridDimensions }) {

    const onChange = e => {
        const { name, value } = e.target;
        changeGridDimensions({
            [name]: value,
        });
    }

    return <div className="GridDimension">
        <div>
            <label htmlFor="cols">Rows</label>
            <input onChange={onChange} type="number" name="rows" id="rows" value={gridDimensions.rows} min={3} max={5} />
        </div>
        <div>
            <label htmlFor="cols">Cols</label>
            <input onChange={onChange} type="number" name="cols" id="cols" value={gridDimensions.cols} min={3} max={5} />
        </div>
    </div>
}