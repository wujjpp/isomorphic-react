import React, { Component } from "react";

export default class Enterprise extends Component<any> {
  public render() {
    const data = this.props.data;
    return (
      <div>
        <fieldset>
          <legend>基本信息</legend>
          <div>{data.eid}</div>
          <div>{data.name}</div>
          <div>{data.entityType}</div>
          <div>{data.logoUrl}</div>
          <div>{data.historyNames}</div>
          <div>{data.status}</div>
          <div>{data.email}</div>
          <div>{data.address}</div>
          <div>{data.websites}</div>
          <div>{data.phone}</div>
          <div>{data.tag}</div>
        </fieldset>

        <br />
        <fieldset>
          <legend>工商信息</legend>
          <div>{data.gsInfo.creditNo}</div>
          <div>{data.gsInfo.orgNo}</div>
          <div>{data.gsInfo.regNo}</div>
          <div>{data.gsInfo.status}</div>
          <div>{data.gsInfo.industry}</div>
          <div>{data.gsInfo.startDate}</div>
          <div>{data.gsInfo.econKind}</div>
          <div>{data.gsInfo.termPeriod}</div>
          <div>{data.gsInfo.operNameTitle}</div>
          <div>{data.gsInfo.operName}</div>
          <div>{data.gsInfo.operPid}</div>
          <div>{data.gsInfo.operEid}</div>
          <div>{data.gsInfo.checkDate}</div>
          <div>{data.gsInfo.regCapi}</div>
          <div>{data.gsInfo.belongOrg}</div>
          <div>{data.gsInfo.address}</div>
          <div>{data.gsInfo.scope}</div>
        </fieldset>

        <br />
        <fieldset>
          <legend>分支机构</legend>
          <table className="table">
            <thead>
              <tr>
                <th>eid</th>
                <th>name</th>
                <th>operName</th>
                <th>operPid</th>
              </tr>
            </thead>
            <tbody>
              {data.branches.map((o, n) => (<tr key={n}><td>{o.eid}</td><td>{o.name}</td><td>{o.operName}</td><td>{o.operPid}</td></tr>))}
            </tbody>
          </table>
        </fieldset>

        <br />
        <fieldset>
          <legend>主要人员</legend>
          <table className="table">
            <thead>
              <tr>
                <th>pid</th>
                <th>title</th>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              {data.employees.map((o, n) => (<tr key={n}><td>{o.pid}</td><td>{o.title}</td><td>{o.name}</td></tr>))}
            </tbody>
          </table>
        </fieldset>

        <br />
        <fieldset>
          <legend>股东信息</legend>
          <table className="table">
            <thead>
              <tr>
                <th>stockType</th>
                <th>stockName</th>
                <th>totalShouldCapi</th>
                <th>totalRealCapi</th>
              </tr>
            </thead>
            <tbody>
              {data.partners.map((o, n) => (<tr key={n}><td>{o.stockType}</td><td>{o.stockName}</td><td>{o.totalShouldCapi}</td><td>{o.totalRealCapi}</td></tr>))}
            </tbody>
          </table>
        </fieldset>

        <br />
        <fieldset>
          <legend>变更记录</legend>
          <table className="table">
            <thead>
              <tr>
                <th>date</th>
                <th>item</th>
                <th>before</th>
                <th>after</th>
              </tr>
            </thead>
            <tbody>
              {data.changeInfo.map((o, n) => (<tr key={n}><td>{o.date}</td><td>{o.item}</td><td>{o.before}</td><td>{o.after}</td></tr>))}
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  }
}
