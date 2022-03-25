USE [monalisa_00]
GO
/****** Object:  Table [dbo].[Actividades]    Script Date: 28/ene./2022 17:26:23 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividades](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[caso_id] [int] NOT NULL,
	[usuario_id] [int] NOT NULL,
	[estado_id] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[actividad] [nvarchar](max) NOT NULL,
	[fecha_proximo] [datetime] NOT NULL,
	[proximo_paso] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_actividades] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bitacora]    Script Date: 28/ene./2022 17:26:23 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bitacora](
	[id] [int] NOT NULL,
	[usuario_id] [int] NOT NULL,
	[dia_hora] [datetime] NOT NULL,
	[entidad] [nvarchar](max) NULL,
	[valor] [int] NOT NULL,
	[accion] [varchar](200) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Casos]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[casos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tipo_caso_id] [int] NOT NULL,
	[usuario_id] [int] NOT NULL,
	[asunto] [nvarchar](50) NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
	[creado] [datetime] NOT NULL,
	[creador] [int] NOT NULL,
	[modificado] [datetime] NOT NULL,
	[modificador] [int] NOT NULL,
 CONSTRAINT [PK_casos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Funciones]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[funciones](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[path] [nvarchar](max) NULL
 CONSTRAINT [PK_funciones] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permisos]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permisos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rol_id] [int] NOT NULL,
	[funcion_id] [int] NOT NULL,
 CONSTRAINT [PK_permisos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](max) NULL,
 CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoCasos]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_casos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tipo] [nchar](15) NULL,
 CONSTRAINT [PK_tipo_casos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rol_id] [int] NOT NULL,
	[nombre] [nvarchar](max) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[celular] [nvarchar](15) NULL,
	[c_identidad] [nvarchar](15) NULL,
	[nit_factura] [nvarchar](15) NULL,
	[nombre_factura] [nvarchar](50) NULL,
	[datos] [nvarchar](max) NULL,
	[intentos] [int] NOT NULL,
	[inactivo] [bit] NOT NULL,
	[fecha_password] [datetime] NOT NULL,
	[creado] [datetime] NOT NULL,
	[creador] [int] NOT NULL,
	[modificado] [datetime] NOT NULL,
	[modificador] [int] NOT NULL,
 CONSTRAINT [PK_usuarios] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[funciones] ON 
GO
INSERT [dbo].[funciones] ([id], [path]) VALUES (1, N'/user')
GO
INSERT [dbo].[funciones] ([id], [path]) VALUES (2, N'/user/add')
GO
INSERT [dbo].[funciones] ([id], [path]) VALUES (3, N'/user/delete')
GO
SET IDENTITY_INSERT [dbo].[funciones] OFF
GO
SET IDENTITY_INSERT [dbo].[permisos] ON 
GO
INSERT [dbo].[permisos] ([id], [rol_id], [funcion_id]) VALUES (1, 1, 1)
GO
INSERT [dbo].[permisos] ([id], [rol_id], [funcion_id]) VALUES (2, 2, 1)
GO
INSERT [dbo].[permisos] ([id], [rol_id], [funcion_id]) VALUES (3, 2, 2)
GO
INSERT [dbo].[permisos] ([id], [rol_id], [funcion_id]) VALUES (4, 2, 3)
GO
SET IDENTITY_INSERT [dbo].[permisos] OFF
GO
SET IDENTITY_INSERT [dbo].[roles] ON 
GO
INSERT [dbo].[roles] ([id], [descripcion]) VALUES (1, N'Administrador')
GO
INSERT [dbo].[roles] ([id], [descripcion]) VALUES (2, N'Contador')
GO
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
SET IDENTITY_INSERT [dbo].[usuarios] ON 
GO
INSERT [dbo].[usuarios] ([id], [rol_id], [rol2_id], [nombre], [email], [password], [celular], [c_identidad], [nit_factura], [nombre_factura], [datos], [intentos], [inactivo], [fecha_password], [creado], [creador], [modificado], [modificador]) VALUES (6, 2, NULL, N'Carlos Frias', N'info@algoritmos.com.bo', N'123', N'77439447', N'3007773', NULL, NULL, NULL, 0, 0, CAST(N'2022-01-01T00:00:00.000' AS DateTime), CAST(N'2022-01-01T00:00:00.000' AS DateTime), 1, CAST(N'2022-01-01T00:00:00.000' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[usuarios] OFF
GO

USE [monalisa_inicio]

CREATE TABLE [dbo].[nombres_db](
       [nit] [nchar](25) NOT NULL,
       [nombre] [nchar](10) NULL,
CONSTRAINT [PK_nombres_db] PRIMARY KEY CLUSTERED 
(
       [nit] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
CREATE TABLE archivos (
    id INT PRIMARY KEY IDENTITY (1, 1),
		caso_id INT NOT NULL,
    nombre VARCHAR (50) NOT NULL
    FOREIGN KEY (caso_id) REFERENCES casos (id)
);
GO
CREATE TABLE estados (
    id INT PRIMARY KEY IDENTITY (1, 1),
    nombre VARCHAR (50) NOT NULL
);
GO
INSERT INTO [dbo].[estados]
           ([nombre])
     VALUES
           ('ACTIVO')
GO
INSERT INTO [dbo].[estados]
           ([nombre])
     VALUES
           ('SUSPENDIDO')
GO
INSERT INTO [dbo].[estados]
           ([nombre])
     VALUES
           ('CONCLUIDO')
GO