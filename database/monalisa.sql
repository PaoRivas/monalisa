USE [monalisa_00]
GO
/****** Object:  Table [dbo].[Actividades]    Script Date: 28/ene./2022 17:26:23 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Actividades](
	[ActividadID] [int] IDENTITY(1,1) NOT NULL,
	[CasoID] [int] NOT NULL,
	[UsuarioID] [int] NOT NULL,
	[EstadoID] [int] NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[Actividad] [nvarchar](max) NOT NULL,
	[FecProximoPaso] [datetime] NOT NULL,
	[ProximoPaso] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Actividades] PRIMARY KEY CLUSTERED 
(
	[ActividadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bitacora]    Script Date: 28/ene./2022 17:26:23 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bitacora](
	[BitacoraID] [int] NOT NULL,
	[UsuarioID] [int] NOT NULL,
	[DiaHora] [datetime] NOT NULL,
	[Entidad] [nvarchar](max) NULL,
	[Valor] [int] NOT NULL,
	[Action] [varchar](200) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Casos]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Casos](
	[CasoID] [int] IDENTITY(1,1) NOT NULL,
	[TipoCasoID] [int] NOT NULL,
	[UsuarioClienteID] [int] NOT NULL,
	[Asunto] [nvarchar](50) NOT NULL,
	[Descripcion] [nvarchar](max) NOT NULL,
	[Creado] [datetime] NOT NULL,
	[UsuarioCreadorID] [int] NOT NULL,
	[Modificado] [datetime] NOT NULL,
	[UsuarioModificadorID] [int] NOT NULL,
 CONSTRAINT [PK_Casos] PRIMARY KEY CLUSTERED 
(
	[CasoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Funciones]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Funciones](
	[FuncionID] [int] IDENTITY(1,1) NOT NULL,
	[Controlador] [nvarchar](max) NULL,
	[Accion] [nvarchar](max) NULL,
 CONSTRAINT [PK_Funciones] PRIMARY KEY CLUSTERED 
(
	[FuncionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permisos]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permisos](
	[PermisoID] [int] IDENTITY(1,1) NOT NULL,
	[RolID] [int] NOT NULL,
	[FuncionID] [int] NOT NULL,
 CONSTRAINT [PK_Permisos] PRIMARY KEY CLUSTERED 
(
	[PermisoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RolID] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](max) NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[RolID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoCasos]    Script Date: 28/ene./2022 17:26:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoCasos](
	[TipoCasoID] [int] IDENTITY(1,1) NOT NULL,
	[Tipo] [nchar](15) NULL,
 CONSTRAINT [PK_TipoCasos] PRIMARY KEY CLUSTERED 
(
	[TipoCasoID] ASC
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
	[rol2_id] [int] NULL,
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
SET IDENTITY_INSERT [dbo].[Funciones] ON 
GO
INSERT [dbo].[Funciones] ([FuncionID], [Controlador], [Accion]) VALUES (1, N'Home', N'Index')
GO
INSERT [dbo].[Funciones] ([FuncionID], [Controlador], [Accion]) VALUES (2, N'Authentication', N'Index')
GO
INSERT [dbo].[Funciones] ([FuncionID], [Controlador], [Accion]) VALUES (3, N'Authentication', N'Validate')
GO
SET IDENTITY_INSERT [dbo].[Funciones] OFF
GO
SET IDENTITY_INSERT [dbo].[Permisos] ON 
GO
INSERT [dbo].[Permisos] ([PermisoID], [RolID], [FuncionID]) VALUES (1, 1, 1)
GO
INSERT [dbo].[Permisos] ([PermisoID], [RolID], [FuncionID]) VALUES (2, 2, 1)
GO
INSERT [dbo].[Permisos] ([PermisoID], [RolID], [FuncionID]) VALUES (3, 2, 2)
GO
INSERT [dbo].[Permisos] ([PermisoID], [RolID], [FuncionID]) VALUES (4, 2, 3)
GO
SET IDENTITY_INSERT [dbo].[Permisos] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 
GO
INSERT [dbo].[Roles] ([RolID], [Descripcion]) VALUES (1, N'Administrador')
GO
INSERT [dbo].[Roles] ([RolID], [Descripcion]) VALUES (2, N'Contador')
GO
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 
GO
INSERT [dbo].[Usuarios] ([UsuarioID], [RolID], [Rol2ID], [Nombre], [Email], [Password], [Celular], [CIdentidad], [NitFactura], [NombreFactura], [Datos], [Intentos], [Inactivo], [UltCambioPwd], [Creado], [Creador], [Modificado], [Modificador]) VALUES (6, 2, NULL, N'Carlos Frias', N'info@algoritmos.com.bo', N'123', N'77439447', N'3007773', NULL, NULL, NULL, 0, 0, CAST(N'2022-01-01T00:00:00.000' AS DateTime), CAST(N'2022-01-01T00:00:00.000' AS DateTime), 1, CAST(N'2022-01-01T00:00:00.000' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO

USE [monalisa_inicio]

CREATE TABLE [dbo].[nombres_db](
       [nit] [nchar](25) NOT NULL,
       [name_db] [nchar](10) NULL,
CONSTRAINT [PK_nombres_db] PRIMARY KEY CLUSTERED 
(
       [nit] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
