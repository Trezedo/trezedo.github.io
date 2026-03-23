---
icon: logos:mysql
date: 2023-05-12
modified: 2026-03-23
category:
    - 数据库
tag:
    - mysql
---

# MySQL SQL 语句

获取表的描述

```sql
desc 表名;
```

## 修改表

添加列（add）

```sql
alter table 表名 add 列名 列的类型 [列的约束];

alter table student add score int not null;
```

修改列（modify）

```sql
alter table 表名 modify 列名 列的类型 [列的约束];

alter table student modify sex varchar(1);
```

修改列（change），包含列名

```sql
alter table 表名 change 列名 新列名 列的类型 [列的约束];

alter table student change sex gender varchar(1);
```

删除列（drop）

```sql
alter table 表名 drop 列名;

alter table student drop score;
```

修改表名（rename）

```sql
rename table 旧表名 to 新的表名
```

> 尽量不要使用
