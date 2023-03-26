import React from "react";

interface Param {
  id: number;
  name: string;
  type: `string`;
}

interface ParamValue {
  paramId: number;
  value: string;
}

// Указан в схеме, но не указан в ТЗ. При необходимости можно добавить в проект.
// interface Color {
//   color: string;
// }

interface Model {
  paramValues: ParamValue[];
  // colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

type State = {
  lastID: number;
  props: Props;
};

class ParamEditor extends React.Component<Props, State> {
  state: State = {
    lastID: 0,
    props: {
      params: [],
      model: {
        paramValues: [],
      },
    },
  };

  // Добавить параметр
  addParam = () => {
    let param: Param = { id: this.state.lastID + 1, name: "", type: `string` };
    let paramValue: ParamValue = { paramId: param.id, value: "" };

    let newParams = [...this.state.props.params, param];
    let newVals = [...this.state.props.model.paramValues, paramValue];

    this.setState({
      lastID: ++this.state.lastID,
      props: {
        ...this.props,
        params: newParams,
        model: {
          ...this.props.model,
          paramValues: newVals,
        },
      },
    });
  };

  // Удалить параметр
  delParam = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();

    let newParams = this.state.props.params.filter((param) => {
      return param.id != id;
    });
    let newVals = this.state.props.model.paramValues.filter((val) => {
      return val.paramId != id;
    });

    this.setState({
      props: {
        ...this.props,
        params: newParams,
        model: {
          ...this.props.model,
          paramValues: newVals,
        },
      },
    });
  };

  // Изменить параметр
  changeParamHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { value } = event.target;
    const i = this.state.props.params.findIndex((param) => {
      return param.id === id;
    });
    let newParams = this.state.props.params;
    newParams[i].name = value;

    this.setState({ props: { ...this.state.props, params: newParams } });
  };

  // Изменить значение параметра
  changeValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { value } = event.target;
    const i = this.state.props.model.paramValues.findIndex((value) => {
      return value.paramId === id;
    });
    let newVals = this.state.props.model.paramValues;
    newVals[i].value = value;

    this.setState({
      props: {
        ...this.state.props,
        model: { ...this.state.props.model, paramValues: newVals },
      },
    });
  };

  // Вывод модели
  getModel = () => {
    return (
      <div style={{ borderLeft: "1px solid grey", paddingLeft: "50px" }}>
        <pre>{JSON.stringify(this.state.props.params, null, 2)}</pre>
        <pre>{JSON.stringify(this.state.props.model, null, 2)}</pre>
      </div>
    );
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              marginLeft: "50px",
              marginRight: "50px",
              gap: "15px",
            }}
          >
            {this.state.props.params.length ? (
              this.state.props.params.map((param) => {
                return (
                  <div style={{ display: "flex", gap: "15px" }} key={param.id}>
                    <input
                      value={param.name}
                      onChange={(e) => {
                        this.changeParamHandler(e, param.id);
                      }}
                    />
                    <input
                      value={
                        this.state.props.model.paramValues.find(
                          (paramValue) => {
                            return paramValue.paramId === param.id;
                          }
                        )?.value
                      }
                      onChange={(e) => {
                        this.changeValueHandler(e, param.id);
                      }}
                    />
                    <button
                      key={param.id}
                      onClick={(e) => {
                        this.delParam(e, param.id);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                );
              })
            ) : (
              <div>Введите Ваш первый элемент.</div>
            )}
            <button onClick={this.addParam}>Добавить</button>
          </div>

          {this.getModel()}
        </>
      </div>
    );
  }
}

export { ParamEditor };
