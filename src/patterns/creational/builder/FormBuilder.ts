export class QueryBuilder {
  private columns: string[]
  private conditions: string[]
  private table: string
  private orderByColumn: string
  private limitValue: number


constructor() {
  this.columns = []
  this.conditions = []
  this.table = ''
  this.orderByColumn = ''
  this.limitValue = 0
}

select(...columns: string[]): QueryBuilder {
  this.columns.push(...columns)
  return this
}

from(table: string): QueryBuilder {
  this.table = table
  return this
}

where(condition: string): QueryBuilder {
  this.conditions.push(condition)
  return this
}

orderBy(column: string): QueryBuilder {
  this.orderByColumn = column   
  return this
}

limit(value: number): QueryBuilder {
  this.limitValue = value
  return this
}

build(): string {
    const columns = this.columns.length > 0 ? this.columns.join(', ') : '*'
    const whereClause = this.conditions.length > 0 ? `WHERE ${this.conditions.join(' AND ')}` : ''
    const orderByClause = this.orderByColumn ? `ORDER BY ${this.orderByColumn}` : ''
    const limitClause = this.limitValue > 0 ? `LIMIT ${this.limitValue}` : ''
    return [ 
        `SELECT ${columns}`,
        `FROM ${this.table}`,
         whereClause,
         orderByClause, 
         limitClause
     ].filter(Boolean).join(' ')
 }
}