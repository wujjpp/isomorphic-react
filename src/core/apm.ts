/*
 * Created by Wu Jian Ping on 2019//
 */

import Table from "easy-table";
import _ from "lodash";

interface IResolution {
  stage: string;
  hrtime: [number, number];
  elapsed: number;
}

export default class Apm {
  private resolutions: IResolution[] = [];
  private time: [number, number];

  constructor(public name: string) {
  }

  public start(): Apm {
    this.resolutions = [];
    this.time = process.hrtime();
    return this;
  }

  public record(stage?: string): Apm {
    const obj = {
      stage: stage ? stage : `stage-${this.resolutions.length}`,
      hrtime: process.hrtime(this.time), //tslint:disable-line
      elapsed: 0,
    };
    this.resolutions.push(obj);
    return this;
  }

  public values(): IResolution[] {
    const results: IResolution[] = [];
    if (this.resolutions.length > 0) {
      results.push(this.resolutions[0]);
      for (let i = 1; i < this.resolutions.length; ++i) {
        this.resolutions[i].elapsed =
          (this.resolutions[i].hrtime[0] - this.resolutions[i - 1].hrtime[0]) * 1000000000
          + this.resolutions[i].hrtime[1] - this.resolutions[i - 1].hrtime[1];
        results.push(this.resolutions[i]);
      }
    }
    return results;
  }

  public print(format: "s" | "ms" | "us" | "ns" = "ns"): void {
    const values = this.values();
    const table = new Table();
    const consoleLogger = console;
    values.forEach((resolution) => {
      table.cell("Stage Name", resolution.stage);
      switch (format) {
        case "s":
          table.cell(`Elapsed(${format})`, resolution.elapsed / 1e+9);
          break;
        case "ms":
          table.cell(`Elapsed(${format})`, resolution.elapsed / 1e+6);
          break;
        case "us":
          table.cell(`Elapsed(${format})`, resolution.elapsed / 1e+3);
          break;
        default:
          table.cell(`Elapsed(${format})`, resolution.elapsed);
          break;
      }
      table.newRow();
    });
    table.total(`Elapsed(${format})`);
    consoleLogger.log(`APM for ${this.name}`);
    consoleLogger.log(table.toString());
  }
}
