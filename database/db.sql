CREATE TABLE business (
  id INT NOT NULL PRIMARY KEY,
  business_name varchar(100) NOT NULL,
  bd_name varchar(25) NOT NULL,
  created DATETIME NOT NULL DEFAULT current_timestamp
);

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY,
  username varchar(100) NOT NULL,
  control_code varchar(45) NOT NULL,
  created DATETIME NOT NULL DEFAULT current_timestamp,
);

CREATE TABLE access (
  id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  business_id INT NOT NULL,
  created DATETIME NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES business(id),
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE [dbo].[usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](100) NOT NULL,
	[fullname] [varchar](45) NOT NULL,
	[password] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[roleId] [int] NOT NULL,
	[role2Id] [int] NULL,
	[name] [nvarchar](max) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[cellphone] [nvarchar](15) NULL,
	[identityCard] [nvarchar](15) NULL,
	[nit] [nvarchar](15) NULL,
	[billName] [nvarchar](50) NULL,
	[data] [nvarchar](max) NULL,
	[attempts] [int] NOT NULL,
	[inactive] [bit] NOT NULL,
	[lastChangePwd] [datetime] NOT NULL,
	[created] [datetime] NOT NULL,
	[creator] [int] NOT NULL,
	[modified] [datetime] NOT NULL,
	[modifier] [int] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]