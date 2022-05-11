USE [master]
GO
/****** Object:  Database [Products]    Script Date: 11/05/2022 12:07:28 AM ******/
/*
ALTER DATABASE [Products] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
DROP DATABASE [Products]
GO
*/

/****** Object:  Database [Products]    Script Date: 11/05/2022 2:58:07 AM ******/
CREATE DATABASE [Products]
GO
ALTER DATABASE [Products] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Products].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Products] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Products] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Products] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Products] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Products] SET ARITHABORT OFF 
GO
ALTER DATABASE [Products] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Products] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Products] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Products] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Products] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Products] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Products] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Products] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Products] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Products] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Products] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Products] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Products] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Products] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Products] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Products] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Products] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Products] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Products] SET  MULTI_USER 
GO
ALTER DATABASE [Products] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Products] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Products] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Products] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [Products] SET DELAYED_DURABILITY = DISABLED 
GO
USE [Products]
GO
/****** Object:  Table [dbo].[products]    Script Date: 11/05/2022 2:58:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[prod_id] [int] IDENTITY(1,1) NOT NULL,
	[prod_name] [varchar](70) NOT NULL,
	[prod_price] [decimal](19, 4) NULL,
	[prod_type_id] [int] NULL,
 CONSTRAINT [PK_products] PRIMARY KEY CLUSTERED 
(
	[prod_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[types]    Script Date: 11/05/2022 2:58:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[types](
	[type_id] [int] NOT NULL,
	[type_name] [varchar](45) NOT NULL,
 CONSTRAINT [PK_types] PRIMARY KEY CLUSTERED 
(
	[type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[products] ON 
GO
INSERT [dbo].[products] ([prod_id], [prod_name], [prod_price], [prod_type_id]) VALUES (1, N'Beef', CAST(1.4000 AS Decimal(19, 4)), 12)
GO
INSERT [dbo].[products] ([prod_id], [prod_name], [prod_price], [prod_type_id]) VALUES (2, N'Potato', CAST(2.0000 AS Decimal(19, 4)), 1)
GO
INSERT [dbo].[products] ([prod_id], [prod_name], [prod_price], [prod_type_id]) VALUES (3, N'Salmon', CAST(5.9900 AS Decimal(19, 4)), 5)
GO
SET IDENTITY_INSERT [dbo].[products] OFF
GO
INSERT [dbo].[types] ([type_id], [type_name]) VALUES (1, N'Vegetables')
GO
INSERT [dbo].[types] ([type_id], [type_name]) VALUES (3, N'Others')
GO
INSERT [dbo].[types] ([type_id], [type_name]) VALUES (5, N'Fish')
GO
INSERT [dbo].[types] ([type_id], [type_name]) VALUES (8, N'Cleaning')
GO
INSERT [dbo].[types] ([type_id], [type_name]) VALUES (12, N'Meat')
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD  CONSTRAINT [FK_products_types] FOREIGN KEY([prod_type_id])
REFERENCES [dbo].[types] ([type_id])
GO
ALTER TABLE [dbo].[products] CHECK CONSTRAINT [FK_products_types]
GO
USE [master]
GO
ALTER DATABASE [Products] SET  READ_WRITE 
GO