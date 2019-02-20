/*
 * Created by Wu Jian Ping on 2019//
 */

import Table from "easy-table";
import _ from "lodash";

interface IResolution {
  name: string;
  hrtime: [number, number];
  elapsed: number;
}

export default class Apm {
  private resolutions: IResolution[] = [];

  constructor(public name: string) { }

  public start(): Apm {
    this.resolutions = [];
    const obj = {
      name: "start",
      hrtime: process.hrtime(),
      elapsed: 0,
    };
    this.resolutions.push(obj);
    return this;
  }

  public mark(name?: string): Apm {
    if (this.resolutions.length === 0) {
      throw new Error("Call start function first");
    }

    const obj = {
      name: name ? name : `stage-${this.resolutions.length}`,
      hrtime: process.hrtime(), //tslint:disable-line
      elapsed: 0,
    };
    this.resolutions.push(obj);
    return this;
  }

  public values(): IResolution[] {
    const results: IResolution[] = [];
    if (this.resolutions.length > 0) {
      for (let i = 1; i < this.resolutions.length; ++i) {
        this.resolutions[i].elapsed =
          (this.resolutions[i].hrtime[0] - this.resolutions[i - 1].hrtime[0]) * 1e+9
          + this.resolutions[i].hrtime[1] - this.resolutions[i - 1].hrtime[1];
        results.push(this.resolutions[i]);
      }
    }
    return results;
  }

  public print(unit: "s" | "ms" | "us" | "ns" = "ns"): void {
    const values = this.values();
    const table = new Table();
    const consoleLogger = console;
    const header = `Elapsed(${unit})`;
    values.forEach((resolution) => {
      table.cell("Stage Name", resolution.name);
      switch (unit) {
        case "s":
          table.cell(header, resolution.elapsed / 1e+9);
          break;
        case "ms":
          table.cell(header, resolution.elapsed / 1e+6);
          break;
        case "us":
          table.cell(header, resolution.elapsed / 1e+3);
          break;
        default:
          table.cell(header, resolution.elapsed);
          break;
      }
      table.newRow();
    });
    table.total(`Elapsed(${unit})`);
    consoleLogger.log(`APM for ${this.name}`);
    consoleLogger.log(table.toString());
  }

  public reset(): Apm {
    this.resolutions = [];
    return this;
  }
}
